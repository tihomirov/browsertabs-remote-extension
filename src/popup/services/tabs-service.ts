import {tabs, Tabs} from 'webextension-polyfill';

export const tabsService = {
	async getTabs(): Promise<Tabs.Tab[]> {
		return tabs.query({});
	},
};
