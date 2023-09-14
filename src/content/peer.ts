import {DataConnection} from 'peerjs';
import browser, {runtime} from 'webextension-polyfill';
import {IExtentionConnection, PeerExtentionConnection} from 'browsertabs-remote-common/src/extention';

import {TabMessageType, ConnectionStatus, ConnectionUpdatedTabMessage} from '../common/types';
import {tabMessageTypeguard, ResponseFactory} from '../common/utils';

class PeerConnection {
  private _connection: IExtentionConnection | undefined = undefined;
  private _dataConnection: DataConnection | undefined = undefined;

  constructor(private readonly _browser: browser.Browser) {
  }

  init(): void {
    this._browser.runtime.onMessage.addListener(this.onMessage);
  }

  destroy(): void {
    this._browser.runtime.onMessage.removeListener(this.onMessage);
    this._connection?.destroy();
  }

  private get tabInfo() {
    return {
      title: window.document.title,
      favIconUrl: document.querySelector<HTMLLinkElement>('link[rel*=\'icon\']')?.href,
    }
  }

  private get connectionStatus(): ConnectionStatus {
    if (!this._dataConnection || !this._connection) {
      return ConnectionStatus.Closed;
    }

    return this._dataConnection ? ConnectionStatus.Connected : ConnectionStatus.Open;
  }

  private readonly onMessage = (message, _sender, sendResponse): true | void => {
    if (!tabMessageTypeguard(message)) {
      // message is external. Do not need to handle
      return;
    }

    switch (message.type) {
    case TabMessageType.StartConnection:
      this.startConnection()
        .then(() => sendResponse(ResponseFactory.success()))
        .catch(error => sendResponse(ResponseFactory.fail({message: error.message})));
      return true;
    case TabMessageType.CloseConnection:
      this.closeConnection()
        .then(() => sendResponse(ResponseFactory.success()))
        .catch(error => sendResponse(ResponseFactory.fail({message: error.message})));
      return true;
    case TabMessageType.RequestConnectionUpdated:
      sendConnectionUpdatedMessage({
        status: this.connectionStatus,
        peerId: this._connection?.peerId,
      })
      return sendResponse(ResponseFactory.success());
    default:
      // do not need to handle other messages here
      return;
    }
  }

  private async startConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this._connection) {
        this._connection.destroy();
      }

      this._connection = new PeerExtentionConnection(this.tabInfo);

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
        console.log('Action$', action)
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
      // this._peer.on('disconnected', () => resolve());
    })
  }

}

export const peerConnection = new PeerConnection(browser);

function sendConnectionUpdatedMessage(message: Omit<ConnectionUpdatedTabMessage, 'type'>): void {
  runtime.sendMessage({
    type: TabMessageType.ConnectionUpdated,
    ...message,
  });
}
