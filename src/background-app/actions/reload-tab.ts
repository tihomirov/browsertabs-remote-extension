import {TabAction} from './tab-action';
import {DefaultTabActionParameters} from './types';

export class ReloadTab extends TabAction<DefaultTabActionParameters> {
	async run() {
		await chrome.tabs.reload(this._parameters.tabId);
	}
}
