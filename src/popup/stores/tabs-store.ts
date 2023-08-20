import {makeObservable, observable, runInAction, computed} from 'mobx';
import browser from 'webextension-polyfill';

import {TabMessageType, TabMessageResponse} from '../../common/types';
import {ResponseFactory} from '../../common/utils';
import {tabsService} from '../services';

export class TabsStore {
	@observable
	private _tabs: browser.Tabs.Tab[] | undefined = undefined;

	@observable
	private _loading = true;

	constructor() {
		makeObservable(this);
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

		runInAction(() => {
			this._tabs = tabs;
			this._loading = false;
		});
	}
}
