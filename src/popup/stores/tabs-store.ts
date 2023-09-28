import {makeObservable, observable, runInAction, computed} from 'mobx';
import {Tabs} from 'webextension-polyfill';

import {PopupMessageType, ConnectionStatus} from '../../common/types';
import {isSomething} from '../../common/utils';
import {tabsService} from '../services';

export type Tab = {
  tab: Tabs.Tab & Required<Pick<Tabs.Tab, 'id'>>;
  status: ConnectionStatus;
  peerId?: string; 
  error?: string
};

export class TabsStore {
  @observable
  private _loading = true;
  @observable
  private _currentTabId: number | undefined = undefined;
  private readonly _tabs = observable.array<Tab>([]);

  constructor() {
    makeObservable(this);

    // TODO: unsubscribe
    tabsService.tabMessage$.subscribe(message => {
      if (isSomething(message.tabId) && message.popupMessagetype === PopupMessageType.ConnectionUpdated) {
        const index = this._tabs.findIndex(({tab}) => tab.id === message.tabId);

        if (isSomething(index)) {
          this._tabs[index] = {
            tab: this._tabs[index].tab,
            status: message.status,
            peerId: message.peerId,
            error: message.error,
          }
        }
      }
    })
    
    void this.fetchTabs();
  }

  @computed
  get tabs(): ReadonlyArray<Tab> {
    return this._tabs;
  }

  @computed
  get currentTab(): Tab | undefined {
    if (!this._currentTabId) {
      return undefined;
    }

    return this._tabs.find(tab => tab.tab.id === this._currentTabId);
  }

  @computed
  get loading(): boolean {
    return this._loading;
  }

  setCurrentTabId(tabId: number): void {
    runInAction(() => this._currentTabId = tabId);
  }

  clearCurrentTab(): void {
    runInAction(() => this._currentTabId = undefined);
  }

  async startConnection(
    tabId: number
  ): Promise<void> {
    await tabsService.sendMessage(tabId, {
      popupMessagetype: PopupMessageType.StartConnection,
    });
  }

  async closeConnection(
    tabId: number
  ): Promise<void> {
    await tabsService.sendMessage(tabId, {
      popupMessagetype: PopupMessageType.CloseConnection,
    });
  }

  async reloadTab(tabId: number): Promise<void> {
    return await tabsService.reloadTab(tabId);
  }

  private async fetchTabs(): Promise<void> {
    const tabs = await tabsService.getTabs();
    const tabsWithId = tabs.filter(tab => tab.id) as Array<Tabs.Tab & Required<Pick<Tabs.Tab, 'id'>>>;

    runInAction(() => {
      this._tabs.replace(
        tabsWithId.map(tab => ({
          tab,
          status: ConnectionStatus.Closed
        })));
      this._loading = false;
    });

    tabsWithId.forEach(tab => this.checkConnection(tab.id))
  }

  private async checkConnection(tabId: number): Promise<void> {
    await tabsService.sendMessage(tabId, {
      popupMessagetype: PopupMessageType.RequestConnectionUpdated,
    });
  }
}
