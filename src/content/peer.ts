import {Peer, DataConnection} from 'peerjs';
import browser from 'webextension-polyfill';

import {TabMessageResponse, TabMessageType} from '../common/types';
import {tabMessageTypeguard, Response, ResponseFactory} from '../common/utils';

type StartConnectionResponse = TabMessageResponse[TabMessageType.StartConnection];
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
        this.startConnection(sendResponse)
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

  private startConnection(sendResponse: (response: Response<StartConnectionResponse>) => void): void {
    if (this._peer) {
      sendResponse(ResponseFactory.success({
        peerId: this._peer.id
      }));
      return;
    }

    this._peer = new Peer();

    this._peer.once('open', (peerId) => sendResponse(ResponseFactory.success({peerId})));
    this._peer.on('connection', this.onConnection);
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
