import {Peer, DataConnection} from 'peerjs';
import browser, {runtime} from 'webextension-polyfill';

import {TabMessageType, ConnectionStatus, ConnectionUpdatedTabMessage} from '../common/types';
import {tabMessageTypeguard, ResponseFactory} from '../common/utils';

class PeerConnection {
  private _peer: Peer | undefined = undefined;
  private readonly _connections: Set<DataConnection> = new Set();

  constructor(private readonly _browser: browser.Browser) {
  }

  init(): void {
    this._browser.runtime.onMessage.addListener(this.onMessage);
  }

  destroy(): void {
    this._browser.runtime.onMessage.removeListener(this.onMessage);
    this._peer?.disconnect();
    this._peer?.destroy();
  }

  private get connectionStatus(): ConnectionStatus {
    if (!this._peer || this._peer.destroyed) {
      return ConnectionStatus.Closed;
    }

    if (this._peer.disconnected) {
      return ConnectionStatus.Closed;
    }

    return this._connections.size > 0 ? ConnectionStatus.Connected : ConnectionStatus.Open;
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
          peerId: this._peer?.id,
        })
        return sendResponse(ResponseFactory.success());
      default:
        // do not need to handle other messages here
        return;
    }
  }

  private async startConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this._peer) {
        return resolve();
      }

      this._peer = new Peer();

      this._peer.once('open', (peerId) => {
        sendConnectionUpdatedMessage({
          status: ConnectionStatus.Open,
          peerId,
        });
        resolve()
      });
      this._peer.on('error', (error) => {
        sendConnectionUpdatedMessage({
          status: ConnectionStatus.Error,
          error: error.message,
        });
        reject(error)
      });

      this._peer.on('connection', this.onConnection);
    })
  }

  private async closeConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._peer) {
        return reject(new Error('There is no Connection to close'));
      }

      this._peer.disconnect();
      this._peer.on('disconnected', () => resolve());
    })
  }

  private readonly onConnection = (connection: DataConnection) => {
    sendConnectionUpdatedMessage({
      status: ConnectionStatus.Connected,
      peerId: this._peer?.id
    });

    this._connections.add(connection);

    connection.on('data', (data) => {
      console.log('Received', data);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (data?.type === 'HandshakeRequest') {
        connection.send({
          type: 'HandshakeResponse',
          tabInfo: {
            title: window.document.title,
            favIconUrl: document.querySelector<HTMLLinkElement>('link[rel*=\'icon\']')?.href,
          }
        })
      }
    });

    connection.on('close', () => {
      this._connections.delete(connection);
      sendConnectionUpdatedMessage({status: ConnectionStatus.Closed});
    });
  }
}

export const peerConnection = new PeerConnection(browser);

function sendConnectionUpdatedMessage(message: Omit<ConnectionUpdatedTabMessage, 'type'>): void {
  runtime.sendMessage({
    type: TabMessageType.ConnectionUpdated,
    ...message,
  });
}
