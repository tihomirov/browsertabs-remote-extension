export type DefaultTabActionParameters = Readonly<{
	tabId: number;
}>;

export type CreateTabActionParameters = Readonly<{
	url: string;
}>;

export type TabActionParameters = DefaultTabActionParameters | CreateTabActionParameters;
