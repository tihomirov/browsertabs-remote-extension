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
  private _currentTab: Tab | undefined = undefined;
  @observable
  private _loading = true;
  private readonly _tabs = observable.array<Tab>([]);

  constructor() {
    makeObservable(this);

    // TODO: unsubscribe
    tabsService.tabMessage$.subscribe(message => {
      if (isSomething(message.tabId) && message.popupMessagetype === PopupMessageType.ConnectionUpdated) {
        const tabInfo = this.getTabInfoById(message.tabId);

        if (tabInfo) {
          tabInfo.status = message.status;
          tabInfo.peerId = message.peerId;
          tabInfo.error = message.error;
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
    return this._currentTab;
  }

  @computed
  get loading(): boolean {
    return this._loading;
  }

  setCurrentTabId(tabId: number): void {
    const tab = this._tabs?.find((tab) => tab.tab.id === tabId);

    runInAction(() => {
      this._currentTab = tab;
    });
  }

  clearCurrentTab(): void {
    runInAction(() => {
      this._currentTab = undefined;
    });
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

  private getTabInfoById(id: number): Tab | undefined {
    return this._tabs.find(({tab}) => tab.id === id)
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
