export enum EventType {
	Ping,
	Pong,
	UpdateBrowserState,
	GetBrowserState,
	CloseTab,
	ReloadTab,
	CreateTab,
}

export type PingEvent = {
	type: EventType.Ping;
};

export type PongEvent = {
	type: EventType.Pong;
};

export type CloseTabEvent = {
	type: EventType.CloseTab;
	tabId: number;
};

export type ReloadTabEvent = {
	type: EventType.ReloadTab;
	tabId: number;
};

export type CreateTabEvent = {
	type: EventType.CreateTab;
	url: string;
};

export type UpdateBrowserStateEvent = {
	type: EventType.UpdateBrowserState;
	state: {
		tabs: chrome.tabs.Tab[];
	};
};

export type GetBrowserStateEvent = {
	type: EventType.GetBrowserState;
};

export type TabEvent = Readonly<CloseTabEvent | ReloadTabEvent | CreateTabEvent>;
