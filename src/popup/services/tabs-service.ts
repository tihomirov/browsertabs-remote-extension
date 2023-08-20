import {runtime, tabs, Tabs, Runtime} from 'webextension-polyfill';
import {fromEventPattern, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

import {TabMessage, TabMessageType, TabMessageResponse} from '../../common/types';
import {isSomething, tabMessageTypeguard, Response} from '../../common/utils';

class TabsService {
	readonly tabMessage$: Observable<TabMessage & {tabId?: number}>;

	constructor() {
		this.tabMessage$ = fromEventPattern(
			handler => runtime.onMessage.addListener(handler),
			handler => runtime.onMessage.removeListener(handler),
			(request, sender: Runtime.MessageSender, sendResponse) => ({request, sender, sendResponse})
		).pipe(
			map(({request, sender}) => 
				tabMessageTypeguard(request)
					? {...request, tabId: sender.tab?.id}
					: undefined
			),
			filter(isSomething)
		);
	}

	async getTabs(): Promise<Tabs.Tab[]> {
		return tabs.query({});
	}

	async sendMessage<T extends TabMessageType>(
		tabId: string | number, 
		message: TabMessage
	): Promise<Response<TabMessageResponse[T]>> {
		return await tabs.sendMessage(Number(tabId), message);
	}
}

export const tabsService = new TabsService()
