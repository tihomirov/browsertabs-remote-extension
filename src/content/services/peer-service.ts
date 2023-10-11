import {
  IExtentionConnection,
  PeerExtentionConnection
} from 'browsertabs-remote-common/src/extention';
import {DataConnection} from 'peerjs';
import {Subject, takeUntil} from 'rxjs';

import {StorageService} from '../../common/services';
import {
  ConnectionStatus,
  ConnectionStatusType,
  PopupMessage,
  PopupMessageType
} from '../../common/types';
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

    this.init();
  }

  dispose(): void {
    this._connection?.destroy();
    this._unsubscribeSubject$.next();
    this._unsubscribeSubject$.complete();
  }

  private async init(): Promise<void>{
    const connection = await this._storageService.getConnectionStatus(this._tabId);

    if (connection?.ttl && connection?.peerId && shouldRestoreConnection(connection)) {
      this.startConnection(connection.ttl, connection?.peerId);
    } else {
      this.setConnectionUpdate({
        status: ConnectionStatusType.Closed,
        error: undefined,
      });
    }
  }

  private readonly onTabMessage = (message: PopupMessage): void => {
    switch (message.popupMessagetype) {
    case PopupMessageType.StartConnection:
      return this.startConnection(message.ttl);
    case PopupMessageType.RestartConnection:
      return this.restartConnection(message.ttl);
    case PopupMessageType.CloseConnection:
      return this.closeConnection();
    default:
      // do not need to handle other messages here
      return;
    }
  };

  private startConnection(ttl: number, peerId?: string): void {
    if (this._connection) {
      console.error('Connection is created and started');
      return;
    }

    this._connection = new PeerExtentionConnection(this._tabService.getTabInfo(), peerId);

    this._connection.open$.subscribe((peerId) => {
      this.setConnectionUpdate({
        status: ConnectionStatusType.Open,
        openAt: Date.now(),
        error: undefined,
        peerId,
        ttl,
      });
    });

    this._connection.error$.subscribe((error) => {
      this.setConnectionUpdate({
        status: ConnectionStatusType.Error,
        error: error.type,
      });
    });

    this._connection.connected$.subscribe((connection: DataConnection) => {
      this.setConnectionUpdate({
        status: ConnectionStatusType.Connected,
        peerId: this._connection?.peerId,
        connectedAt: Date.now(),
        error: undefined,
      });

      this._dataConnection = connection;
    });

    this._connection.disconnected$.subscribe(() => {
      this._dataConnection = undefined;
      this._connection = undefined;
      this.setConnectionUpdate({
        status: ConnectionStatusType.Closed,
        error: undefined,
      });
    });

    this._connection.action$.subscribe((action) => {
      const actionCommand = createAction(action, this._messageService);

      actionCommand.run();
    });
  }

  private restartConnection(ttl: number): void {
    this.closeConnection();
    this.startConnection(ttl);
  }

  private closeConnection(): void {
    if (!this._connection) {
      console.error('There is no Connection to close');
      return;
    }

    this._connection?.destroy();
  }

  private async setConnectionUpdate(
    update: Omit<ConnectionStatus, 'updatedAt'>,
  ): Promise<void> {
    this._storageService.setConnectionStatusUpdate(this._tabId, update);
  }
}

function shouldRestoreConnection({status, peerId, ttl, openAt}: ConnectionStatus): boolean {
  if (!peerId || !ttl || !openAt) {
    return false;
  }

  const isConnectionActive = status === ConnectionStatusType.Connected
    || status === ConnectionStatusType.Open;
  const isExpired = Date.now() - openAt > ttl * 1000;

  return isConnectionActive && !isExpired;
}
