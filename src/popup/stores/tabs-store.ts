import {makeObservable, observable, runInAction, computed} from 'mobx';
import browser from 'webextension-polyfill';

import {TabMessageType, ConnectionStatus} from '../../common/types';
import {ResponseFactory, isSomething} from '../../common/utils';
import {tabsService} from '../services';

type TabStatus = Readonly<{
	connection: ConnectionStatus;
	peerId?: string; 
	error?: string
}>;

const defaultTabStatus: TabStatus = {
	connection: ConnectionStatus.Closed,
}

export class TabsStore {
	@observable
	private _tabs: browser.Tabs.Tab[] | undefined = undefined;
	private readonly _tabsStatus = observable.map<number, TabStatus>();

	@observable
	private _loading = true;

	constructor() {
		makeObservable(this);

		// TODO: unsubscribe
		tabsService.tabMessage$.subscribe(message => {
			if (isSomething(message.tabId) && message.type === TabMessageType.ConnectionUpdated) {
				this._tabsStatus.set(message.tabId, {
					connection: message.status,
					peerId: message.peerId,
					error: message.error,
				})
			}
		})

		void this.fetchTabs();
	}

	@computed
	get tabs(): browser.Tabs.Tab[] | undefined {
		return this._tabs;
	}

	@computed
	get loading(): boolean {
		return this._loading;
	}

	getTabsStatus(tabId: number): TabStatus {
		return this._tabsStatus.get(tabId) ?? defaultTabStatus;
	}

	async startConnection(
		tabId: number
	): Promise<string | undefined> {
		const response = await tabsService.sendMessage<TabMessageType.StartConnection>(tabId, {
			type: TabMessageType.StartConnection,
		});

		if (ResponseFactory.isFail(response)) {
			console.error(response.data.message)
			return response.data.message;
		}
	}

	async reloadTab(tabId: number): Promise<void> {
		return await tabsService.reloadTab(tabId);
	}

	private async fetchTabs(): Promise<void> {
		const tabs = await tabsService.getTabs();

		tabs.forEach(tab => isSomething(tab.id) && this.checkConnection(tab.id))

		runInAction(() => {
			this._tabs = tabs;
			this._loading = false;
		});
	}

	private async checkConnection(tabId: number): Promise<void> {
		const response = await tabsService.sendMessage<TabMessageType.RequestConnectionUpdated>(tabId, {
			type: TabMessageType.RequestConnectionUpdated,
		});

		if (ResponseFactory.isFail(response)) {
			console.error(response.data.message)
			return;
		}
	}
}
