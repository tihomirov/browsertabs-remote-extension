import {Peer, DataConnection} from 'peerjs';
import browser from 'webextension-polyfill';

import {TabMessageResponse, TabMessageType} from '../common/types';
import {tabMessageTypeguard, ResponseFactory} from '../common/utils';

type StartConnectionResponse = TabMessageResponse[TabMessageType.StartConnection];
type CloseConnectionResponse = TabMessageResponse[TabMessageType.CloseConnection];
type CheckConnectionResponse = TabMessageResponse[TabMessageType.CheckConnection];

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

  private readonly onMessage = (message, _sender, sendResponse): true | void => {
    if (!tabMessageTypeguard(message)) {
      // message is external. Do not need to handle
      return;
    }

    switch (message.type) {
      case TabMessageType.StartConnection:
        this.startConnection()
          .then(responce => sendResponse(ResponseFactory.success<StartConnectionResponse>(responce)))
          .catch(error => sendResponse(ResponseFactory.fail({message: error.message})));
        return true;
      case TabMessageType.CloseConnection:
        this.closeConnection()
          .then(() => sendResponse(ResponseFactory.success<CloseConnectionResponse>(undefined)))
          .catch(error => sendResponse(ResponseFactory.fail({message: error.message})));
        return true;
      case TabMessageType.CheckConnection:
        return sendResponse(
          ResponseFactory.success<CheckConnectionResponse>({
            peerId: this._peer?.id,
            connected: this._connections.size > 0,
          })
        );
      default:
        // do not need to handle other messages here
        return
    }
  }

  private async startConnection(): Promise<StartConnectionResponse> {
    return new Promise((resolve, reject) => {
      if (this._peer) {
        return resolve({peerId: this._peer.id});
      }

      this._peer = new Peer();

      this._peer.once('open', (peerId) => resolve({peerId}));
      this._peer.on('error', (error) => reject(error));

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
    this._browser.runtime.sendMessage({
      type: TabMessageType.ConnectionUpdated,
      connected: true,
    });

    this._connections.add(connection);

    connection.on('data', (data) => {
      console.log('Received', data);
    });

    connection.on('close', () => {
      this._connections.delete(connection);

      this._browser.runtime.sendMessage({
        type: TabMessageType.ConnectionUpdated,
        connected: false,
      });
    });
  }
}

export const peerConnection = new PeerConnection(browser);
