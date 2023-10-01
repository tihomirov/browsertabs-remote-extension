import {Subject, takeUntil} from 'rxjs';
import {DataConnection} from 'peerjs';
import {IExtentionConnection, PeerExtentionConnection} from 'browsertabs-remote-common/src/extention';

import {PopupMessageType, ConnectionStatus, ConnectionUpdate, PopupMessage} from '../../common/types';
import {StorageService} from '../../common/services';
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
    private readonly _messageService: MessageService,
    private readonly _storageService: StorageService,
  ) {
    _messageService.tabMessage$.pipe(
      takeUntil(this._unsubscribeSubject$)
    ).subscribe(this.onTabMessage);

    this.setConnectionUpdate({
      status: this.connectionStatus,
      peerId: this._connection?.peerId,
    })
  }

  dispose(): void {
    this._connection?.destroy();
    this._unsubscribeSubject$.next();
    this._unsubscribeSubject$.complete();
  }

  private get connectionStatus(): ConnectionStatus {
    if (!this._connection) {
      return ConnectionStatus.Closed;
    }

    return this._dataConnection ? ConnectionStatus.Connected : ConnectionStatus.Open;
  }

  private readonly onTabMessage = (message: PopupMessage): void => {
    switch (message.popupMessagetype) {
    case PopupMessageType.StartConnection:
      this.startConnection();
      return;
    case PopupMessageType.CloseConnection:
      this.closeConnection();
      return 
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
        this.setConnectionUpdate({
          status: ConnectionStatus.Open,
          peerId,
        });
        resolve()
      });

      this._connection.error$.subscribe((error) => {
        this.setConnectionUpdate({
          status: ConnectionStatus.Error,
          error: error.type,
        });
        reject(error)
      });

      this._connection.connected$.subscribe((connection: DataConnection) => {
        this.setConnectionUpdate({
          status: ConnectionStatus.Connected,
          peerId: this._connection?.peerId,
        });
    
        this._dataConnection = connection;
      });

      this._connection.close$.subscribe(() => {
        this._dataConnection = undefined;
        this.setConnectionUpdate({
          status: ConnectionStatus.Closed
        });
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

  private async setConnectionUpdate(update:ConnectionUpdate): Promise<void> {
    this._storageService.setConnectionStatusUpdate(this._tabId, update)
  }
}
