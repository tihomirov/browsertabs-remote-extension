import {runtime, tabs} from 'webextension-polyfill';

import {backgroundMessageTypeguard} from './common/utils';
import {BackgroundMessage, BackgroundMessageType} from './common/types';

const ZOOM_STEP = 0.1;

runtime.onMessage.addListener(async (message, sender) => {
  if (backgroundMessageTypeguard(message)) {
    const tabId = sender.tab?.id;

    switch (message.backgroundMessageType) {
    case BackgroundMessageType.RequestTabId:
      if (tabId) {
        sendMessage(tabId, {
          tabId,
          backgroundMessageType: BackgroundMessageType.ResponseTabId,
        })
      }
      return;
    case BackgroundMessageType.DecreaseZoom:
      tabs.getZoom(tabId).then((zoom) => tabs.setZoom(tabId, zoom - ZOOM_STEP));
      return;
    case BackgroundMessageType.IncreaseZoom:
      tabs.getZoom(tabId).then((zoom) => tabs.setZoom(tabId, zoom + ZOOM_STEP));
      return;
    case BackgroundMessageType.SetZoom:
      tabs.setZoom(tabId, message.zoomFactor / 100);
      return;
    case BackgroundMessageType.ToggleMute:
      await tabs.update(tabId, {muted: !sender.tab?.mutedInfo?.muted});
      return;
    case BackgroundMessageType.CloseTab:
      if (tabId) {
        tabs.remove(tabId);
      }
      return;
    }
  }
});

function sendMessage(tabId: number, message: BackgroundMessage): void {
  chrome.tabs.sendMessage(tabId, message);
}
