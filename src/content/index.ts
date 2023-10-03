import browser from 'webextension-polyfill';

import {StorageService} from '../common/services';
import {MessageService, PeerService,TabService} from './services';

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

    peerService = new PeerService(tabId, tabService, messageService, storageService);
  });
}
