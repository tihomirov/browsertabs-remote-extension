import {makeObservable, observable, runInAction, computed} from 'mobx';
import browser from 'webextension-polyfill';

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

	private async fetchTabs(): Promise<void> {
		const tabs = await tabsService.getTabs();

		runInAction(() => {
			this._tabs = tabs;
			this._loading = false;
		});
	}
}
