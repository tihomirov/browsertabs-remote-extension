import browser from 'webextension-polyfill';

import {MessageService, TabService, PeerService} from './services';
import {StorageService} from '../common/services';

start();

function start() {
  const messageService = new MessageService(browser);
  const tabService = new TabService(messageService);
  const storageService = new StorageService(browser);

  let peerService: PeerService | undefined = undefined;

  tabService.tabId$.subscribe(tabId => {
    if (peerService) {
      peerService.dispose();
    }

    peerService = new PeerService(tabId, tabService, messageService, storageService)
  })
}
