import {Peer, DataConnection} from 'peerjs';
import browser from 'webextension-polyfill';

import {TabMessageResponse, TabMessageType} from '../common/types';
import {tabMessageTypeguard, Response, ResponseFactory} from '../common/utils';

type StartConnectionResponse = TabMessageResponse[TabMessageType.StartConnection];

class PeerConnection {
  private _peer: Peer | undefined = undefined;

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

  private readonly onMessage = (message: unknown, _sender, sendResponse: (response: Response<StartConnectionResponse>) => void): true | void => {
    if (!tabMessageTypeguard(message)) {
      // message is external. Do not need to handle
      return;
    }

    switch (message.type) {
      case TabMessageType.StartConnection:
        this.startConnection(sendResponse)
        return true;
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
    console.log('!!!!!! send TabMessageType.ConnectionOpen')

    this._browser.runtime.sendMessage({
      type: TabMessageType.ConnectionOpen
    });

    connection.on('data', (data) => {
      console.log('Received', data);
    });
  }
}

export const peerConnection = new PeerConnection(browser);
