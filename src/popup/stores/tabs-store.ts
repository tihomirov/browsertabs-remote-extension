import {computed, makeObservable, observable, runInAction} from 'mobx';
import {Tabs} from 'webextension-polyfill';

import {ConnectionStatus, ConnectionStatusType, PopupMessageType} from '../../common/types';
import {storageService, tabsService} from '../services';
import {RootStore} from './root-store';

export type Tab = {
  tab: Tabs.Tab & Required<Pick<Tabs.Tab, 'id'>>;
  status: ConnectionStatusType;
  peerId?: string;
  error?: string
};

export class TabsStore {
  @observable
  private _loading = true;
  @observable
  private _currentTabId: number | undefined = undefined;
  private readonly _tabs = observable.array<Tab>([]);

  constructor(private readonly _rootStore: RootStore) {
    makeObservable(this);

    // TODO: unsubscribe
    storageService.connectionUpdate$.subscribe(({tabId, update}) => {
      this.updateTabStatus(tabId, update);
    });

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
    tabsService.sendMessage(tabId, {
      popupMessagetype: PopupMessageType.StartConnection,
      ttl: this._rootStore.settingsStore.connectionTtl,
    }).catch(error => this._rootStore.errorStore.addError(error));
  }

  async restartConnection(
    tabId: number
  ): Promise<void> {
    tabsService.sendMessage(tabId, {
      popupMessagetype: PopupMessageType.RestartConnection,
      ttl: this._rootStore.settingsStore.connectionTtl,
    }).catch(error => this._rootStore.errorStore.addError(error));
  }

  async closeConnection(
    tabId: number
  ): Promise<void> {
    tabsService.sendMessage(tabId, {
      popupMessagetype: PopupMessageType.CloseConnection,
    }).catch(error => this._rootStore.errorStore.addError(error));
  }

  async reloadTab(tabId: number): Promise<void> {
    return await tabsService.reloadTab(tabId);
  }

  private async fetchTabs(): Promise<void> {
    const [tabs, connectionsStatus] = await Promise.all([
      tabsService.getTabs(),
      storageService.getConnectionsStatus(),
    ]);

    const tabsWithId = tabs
      .filter(tab => tab.id) as Array<Tabs.Tab & Required<Pick<Tabs.Tab, 'id'>>>;

    runInAction(() => {
      this._tabs.replace(
        tabsWithId.map(tab => {
          const tabStatus: ConnectionStatus = connectionsStatus?.[tab.id] ?? {
            status: ConnectionStatusType.Closed,
            updatedAt: Date.now(),
            error: undefined,
          };

          return {
            tab,
            ...tabStatus,
          };
        }));
      this._loading = false;
    });
  }

  private updateTabStatus(tabId: number, update: Omit<Tab, 'tab'>): void {
    const index = this._tabs.findIndex(({tab}) => tab.id === tabId);
    const tab = this._tabs[index];

    if (!tab || this.isTabStatusEqual(tab, update)) {
      return;
    }

    runInAction(() => this._tabs[index] = {
      tab: this._tabs[index].tab,
      status: update.status,
      peerId: update.peerId,
      error: update.error,
    });
  }

  private isTabStatusEqual(tab1: Omit<Tab, 'tab'>, tab2: Omit<Tab, 'tab'>): boolean {
    return tab1.status === tab2.status && tab1.peerId === tab2.peerId && tab1.error === tab2.error;
  }

}
