import {Subject, takeUntil} from 'rxjs';
import {DataConnection} from 'peerjs';
import {runtime} from 'webextension-polyfill';
import {IExtentionConnection, PeerExtentionConnection} from 'browsertabs-remote-common/src/extention';

import {TabMessageType, ConnectionStatus, ConnectionUpdatedTabMessage, TabMessage} from '../../common/types';
import {createAction} from '../actions';

import {MessageService} from './message-service';
import {TabService} from './tab-service';

export class PeerService {
  private _connection: IExtentionConnection | undefined = undefined;
  private _dataConnection: DataConnection | undefined = undefined;
  private readonly _unsubscribeSubject$ = new Subject<void>();

  constructor(
    private readonly _tabId: number,
    private readonly _tabService: TabService,
    private readonly _messageService: MessageService
  ) {
    _messageService.tabMessage$.pipe(
      takeUntil(this._unsubscribeSubject$)
    ).subscribe(this.onTabMessage)
  }

  dispose(): void {
    this._connection?.destroy();
    this._unsubscribeSubject$.next();
    this._unsubscribeSubject$.complete();
  }

  private get connectionStatus(): ConnectionStatus {
    if (!this._dataConnection || !this._connection) {
      return ConnectionStatus.Closed;
    }

    return this._dataConnection ? ConnectionStatus.Connected : ConnectionStatus.Open;
  }

  private readonly onTabMessage = (message: TabMessage): void => {
    switch (message.type) {
    case TabMessageType.StartConnection:
      this.startConnection();
      return;
    case TabMessageType.CloseConnection:
      this.closeConnection();
      return 
    case TabMessageType.RequestConnectionUpdated:
      sendConnectionUpdatedMessage({
        status: this.connectionStatus,
        peerId: this._connection?.peerId,
      })
      return;
    default:
      // do not need to handle other messages here
      return;
    }
  }

  private async startConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this._connection) {
        return resolve();
      }

      this._connection = new PeerExtentionConnection(this._tabService.getTabInfo());

      this._connection.open$.subscribe((peerId) => {
        sendConnectionUpdatedMessage({
          status: ConnectionStatus.Open,
          peerId,
        });
        resolve()
      });

      this._connection.error$.subscribe((error) => {
        sendConnectionUpdatedMessage({
          status: ConnectionStatus.Error,
          error,
        });
        reject(error)
      });

      this._connection.connected$.subscribe((connection: DataConnection) => {
        sendConnectionUpdatedMessage({
          status: ConnectionStatus.Connected,
          peerId: this._connection?.peerId,
        });
    
        this._dataConnection = connection;
      });

      this._connection.close$.subscribe(() => {
        this._dataConnection = undefined;
        sendConnectionUpdatedMessage({status: ConnectionStatus.Closed});
      });

      this._connection.action$.subscribe((action) => {
        const actionCommand = createAction(action, this._messageService);

        actionCommand.run();
      });
    })
  }

  private async closeConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._connection) {
        return reject(new Error('There is no Connection to close'));
      }

      this._connection?.destroy();
      resolve();
    })
  }
}

function sendConnectionUpdatedMessage(message: Omit<ConnectionUpdatedTabMessage, 'type'>): void {
  runtime.sendMessage({
    type: TabMessageType.ConnectionUpdated,
    ...message,
  });
}
