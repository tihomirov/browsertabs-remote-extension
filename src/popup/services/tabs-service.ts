import {fromEventPattern, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {Runtime,runtime, Tabs, tabs} from 'webextension-polyfill';

import {PopupMessage, popupMessageTypeguard} from '../../common/types';
import {isSomething} from '../../common/utils';

class TabsService {
  readonly tabMessage$: Observable<PopupMessage & {tabId?: number}>;

  constructor() {
    this.tabMessage$ = fromEventPattern(
      handler => runtime.onMessage.addListener(handler),
      handler => runtime.onMessage.removeListener(handler),
      (request, sender: Runtime.MessageSender, sendResponse) => ({request, sender, sendResponse})
    ).pipe(
      map(({request, sender}) =>
        popupMessageTypeguard(request)
          ? {...request, tabId: sender.tab?.id}
          : undefined
      ),
      filter(isSomething)
    );
  }

  async getTabs(): Promise<Tabs.Tab[]> {
    return tabs.query({});
  }

  async sendMessage(
    tabId: number,
    message: PopupMessage
  ): Promise<void> {
    return tabs.sendMessage(tabId, message);
  }

  async reloadTab(tabId: number): Promise<void> {
    await tabs.reload(tabId);
  }
}

export const tabsService = new TabsService();
