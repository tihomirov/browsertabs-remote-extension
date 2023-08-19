export enum TabMessageType {
  StartConnection = 'StartConnection',
}

export type StartConnectionTabMessage = Readonly<{
  type: TabMessageType.StartConnection;
}>;

export type TabMessage = StartConnectionTabMessage

export type TabMessageResponse = {
  [TabMessageType.StartConnection]: Readonly<{ peerId: string }>;
};
