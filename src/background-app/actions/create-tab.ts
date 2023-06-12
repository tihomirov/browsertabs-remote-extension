import {TabAction} from './tab-action';
import {CreateTabActionParameters} from './types';

export class CreateTab extends TabAction<CreateTabActionParameters> {
	async run() {
		await chrome.tabs.create({url: this._parameters.url});
	}
}
