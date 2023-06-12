import {TabAction, CreateTab, CloseTab, ReloadTab, TabActionParameters} from './actions';
import {TabEvent, EventType, PingEvent, PongEvent, UpdateBrowserStateEvent, GetBrowserStateEvent} from './events';
import {assertUnreachable, isSomething} from './utils';

const pingIntervalId = 10_000;

export class Connection {
	private readonly _socket: WebSocket;
	private readonly _pingIntervalId: number;

	constructor(host: string) {
		this._socket = new WebSocket(`${host}?extension=true`);

		this._socket.addEventListener('open', this.onOpen);
		this._socket.addEventListener('message', this.onMessage);

		this._pingIntervalId = self.setInterval(this.sendPing, pingIntervalId);
	}

	destroy(): void {
		self.clearInterval(this._pingIntervalId);

		this._socket.removeEventListener('open', this.onOpen);
		this._socket.removeEventListener('message', this.onMessage);
		this._socket.close();

		chrome.tabs.onUpdated.removeListener(this.sendBrowserState);
	}

	private readonly onOpen = (): void => {
		chrome.tabs.onUpdated.addListener(this.sendBrowserState);
	};

	private readonly onMessage = async (event: MessageEvent<PongEvent | GetBrowserStateEvent | TabEvent>): Promise<void> => {
		console.log('Message from server', event.data);

		if (!isSomething(event.data) || !event.data.type) {
			console.log('Message from server is not supported', event);
			return;
		}

		if (event.data.type === EventType.Pong) {
			console.log('Pong message from server');
			return;
		}

		if (event.data.type === EventType.GetBrowserState) {
			void this.sendBrowserState();
			return;
		}

		const action = getTabAction(event.data);
		void action.run();
	};

	private readonly sendBrowserState = async (): Promise<void> => {
		const tabs = await chrome.tabs.query({});

		const eventUpdateBrowserState: UpdateBrowserStateEvent = {
			type: EventType.UpdateBrowserState,
			state: {
				tabs,
			},
		};

		console.log('UPD tabs', eventUpdateBrowserState);

		this._socket.send(JSON.stringify(eventUpdateBrowserState));
	};

	private readonly sendPing = (): void => {
		const eventPing: PingEvent = {
			type: EventType.Ping,
		};

		this._socket.send(JSON.stringify(eventPing));
	};
}

function getTabAction(event: TabEvent): TabAction<TabActionParameters> {
	const eventType = event.type;
	switch (eventType) {
		case EventType.CloseTab:
			return new CloseTab({tabId: event.tabId});
		case EventType.ReloadTab:
			return new ReloadTab({tabId: event.tabId});
		case EventType.CreateTab:
			return new CreateTab({url: event.url});
		default:
			return assertUnreachable(eventType);
	}
}
