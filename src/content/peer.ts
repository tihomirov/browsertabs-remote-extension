import {Peer, DataConnection} from 'peerjs';
import {runtime, storage} from 'webextension-polyfill';

import {TabMessageResponse, TabMessageType} from '../common/types';
import {tabMessageTypeguard, Response, ResponseFactory} from '../common/utils';

type StartConnectionResponse = TabMessageResponse[TabMessageType.StartConnection];
type SendResponse = (response: Response<StartConnectionResponse>) => void;

const TABS_WITH_OPEN_PEER_KEY = 'tabs_with_open_peer';

class PeerConnection {
  private _peer: Peer | undefined = undefined;

  async init(): Promise<void> {
    // if (this.startConnectionOnInit) {
    //   this.startConnection();
    // }

    runtime.onMessage.addListener(this.onMessage);
  }

  destroy(): void {
    runtime.onMessage.removeListener(this.onMessage);
    this._peer?.disconnect();
    this._peer?.destroy();
  }

  private readonly onMessage = (message: unknown, sender, sendResponse: SendResponse): true | void => {
    if (!tabMessageTypeguard(message)) {
      // message is external. Do not need to handle
      return;
    }

    switch (message.type) {
      case TabMessageType.StartConnection:
        this.startConnection(sendResponse, true, sender.tab.id);
        return true;
      default:
        // do not need to handle other messages here
        return
    }
  }

  private startConnection(sendResponse?: SendResponse, setToStorage?: boolean, tabId?: number): void {
    if (this._peer) {
      sendResponse?.(ResponseFactory.success({
        peerId: this._peer.id
      }));
      return;
    }

    this._peer = new Peer();

    this._peer.once('open', (peerId) => {
      sendResponse?.(ResponseFactory.success({peerId}))

      if (setToStorage && tabId !== undefined) {
        this.saveConnectionToStorage(tabId, peerId)
      }
    });
    this._peer.on('connection', this.onConnection);
  }

  private readonly onConnection = (connection: DataConnection) => {
    console.log('!!!!!! send TabMessageType.ConnectionOpen')

    runtime.sendMessage({
      type: TabMessageType.ConnectionOpen
    });

    connection.on('data', (data) => {
      console.log('Received', data);
      storage.local.get()
    });
  }

  // private async startConnectionOnInit(): Promise<boolean> {
  //   const tabsWithOpenPeer = await storage.local.get([TABS_WITH_OPEN_PEER_KEY]);
  //   const value = tabsWithOpenPeer[TABS_WITH_OPEN_PEER_KEY];

  //   if (value && value[tabId.toString()]) {}
  // }

  private async saveConnectionToStorage(tabId: number, peerId: string): Promise<void> {
    const tabsWithOpenPeer = await storage.local.get([TABS_WITH_OPEN_PEER_KEY]);

    const value = tabsWithOpenPeer[TABS_WITH_OPEN_PEER_KEY] ?? {};

    value[tabId.toString()] = {
      peerId,
      createdDate: Date.now(),
    };

    await storage.local.set({
      [TABS_WITH_OPEN_PEER_KEY]: value
    })
  }
}

export const peerConnection = new PeerConnection();
