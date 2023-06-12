import {TabAction} from './tab-action';
import {DefaultTabActionParameters} from './types';

export class CloseTab extends TabAction<DefaultTabActionParameters> {
	async run() {
		await chrome.tabs.remove(this._parameters.tabId);
	}
}
