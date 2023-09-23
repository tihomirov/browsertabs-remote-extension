import {runtime, tabs, Tabs, Runtime} from 'webextension-polyfill';
import {fromEventPattern, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

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
    try {
      await tabs.sendMessage(tabId, message);
    } catch (error) {
      console.error(tabId, error);
    }
  }

  async reloadTab(tabId: number): Promise<void> {
    await tabs.reload(tabId);
  }
}

export const tabsService = new TabsService()
