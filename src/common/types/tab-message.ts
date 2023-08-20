export enum TabMessageType {
  StartConnection = 'StartConnection',
  ConnectionOpen = 'ConnectionOpen',
}

export type StartConnectionTabMessage = Readonly<{
  type: TabMessageType.StartConnection;
}>;

export type ConnectionOpenTabMessage = Readonly<{
  type: TabMessageType.ConnectionOpen;
}>;

export type TabMessage = StartConnectionTabMessage | ConnectionOpenTabMessage;

export type TabMessageResponse = {
  [TabMessageType.StartConnection]: Readonly<{ peerId?: string }>;
  [TabMessageType.ConnectionOpen]: undefined;
};
