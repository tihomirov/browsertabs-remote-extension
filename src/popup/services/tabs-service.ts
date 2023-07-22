import browser from 'webextension-polyfill';

export const tabsService = {
	async getTabs(): Promise<browser.Tabs.Tab[]> {
		return browser.tabs.query({});
	},
};
