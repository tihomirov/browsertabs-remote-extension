import {makeObservable, observable, runInAction, computed} from 'mobx';
import browser from 'webextension-polyfill';

import {TabMessageType, TabMessageResponse} from '../../common/types';
import {ResponseFactory, isSomething} from '../../common/utils';
import {tabsService} from '../services';

type ConnectionStatus = boolean;
type ConnectionError = string | undefined;

export class TabsStore {
	@observable
	private _tabs: browser.Tabs.Tab[] | undefined = undefined;
	private readonly _tabsConnectionStatus = observable.map<number, [ConnectionStatus, ConnectionError]>();

	@observable
	private _loading = true;

	constructor() {
		makeObservable(this);

		// TODO: unsubscribe
		tabsService.tabMessage$.subscribe(message => {
			if (isSomething(message.tabId) && message.type === TabMessageType.ConnectionUpdated) {
				this._tabsConnectionStatus.set(message.tabId, [message.connected, undefined])
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

	getTabsConnectionStatus(tabId: number): [ConnectionStatus, ConnectionError] {
		return this._tabsConnectionStatus.get(tabId) ?? [false, undefined];
	}

	async startConnection(
		tabId: number
	): Promise<[
		TabMessageResponse[TabMessageType.StartConnection] | undefined, 
		string | undefined
	]> {
		const response = await tabsService.sendMessage<TabMessageType.StartConnection>(tabId, {
			type: TabMessageType.StartConnection,
		});

		if (ResponseFactory.isFail(response)) {
			console.error(response.data.message)
			return [undefined, response.data.message];
		}

		return [response.data, undefined];
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
		const response = await tabsService.sendMessage<TabMessageType.CheckConnection>(tabId, {
			type: TabMessageType.CheckConnection,
		});

		if (ResponseFactory.isFail(response)) {
			console.error(response.data.message)
			return;
		}

		runInAction(() => this._tabsConnectionStatus.set(tabId, [response.data.connected, undefined]))
	}
}
