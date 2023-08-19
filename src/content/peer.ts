import {Peer} from 'peerjs';
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
      this._peer.once('open', (peerId) => sendResponse(ResponseFactory.success({peerId})));
      return;
    }

    this._peer = new Peer();

    this._peer.once('open', (peerId) => sendResponse(ResponseFactory.success({peerId})));
  }
}

export const peerConnection = new PeerConnection(browser);
