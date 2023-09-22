import browser from 'webextension-polyfill';

import {MessageService, TabService, PeerService} from './services';

start();

function start() {
  const messageService = new MessageService(browser);
  const tabService = new TabService(messageService);

  let peerService: PeerService | undefined = undefined;

  tabService.tabId$.subscribe(tabId => {
    if (peerService) {
      peerService.dispose();
    }

    peerService = new PeerService(tabId, tabService, messageService)
  })
}
