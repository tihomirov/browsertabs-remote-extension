export enum TabMessageType {
  StartConnection = 'StartConnection',
  CheckConnection = 'CheckConnection',
  ConnectionOpen = 'ConnectionOpen',
}

export type StartConnectionTabMessage = Readonly<{
  type: TabMessageType.StartConnection;
}>;

export type CheckConnectionTabMessage = Readonly<{
  type: TabMessageType.CheckConnection;
}>;

export type ConnectionOpenTabMessage = Readonly<{
  type: TabMessageType.ConnectionOpen;
}>;

export type TabMessage = StartConnectionTabMessage | CheckConnectionTabMessage | ConnectionOpenTabMessage;

export type TabMessageResponse = {
  [TabMessageType.StartConnection]: Readonly<{ peerId?: string }>;
  [TabMessageType.CheckConnection]: Readonly<{ peerId?: string }>;
  [TabMessageType.ConnectionOpen]: undefined;
};
