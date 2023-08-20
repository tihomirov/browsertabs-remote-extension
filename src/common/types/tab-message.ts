export enum TabMessageType {
  StartConnection = 'StartConnection',
  CheckConnection = 'CheckConnection',
  ConnectionUpdated = 'ConnectionUpdated',
}

export type StartConnectionTabMessage = Readonly<{
  type: TabMessageType.StartConnection;
}>;

export type CheckConnectionTabMessage = Readonly<{
  type: TabMessageType.CheckConnection;
}>;

export type ConnectionUpdatedTabMessage = Readonly<{
  type: TabMessageType.ConnectionUpdated;
  connected: boolean;
}>;

export type TabMessage = StartConnectionTabMessage | CheckConnectionTabMessage | ConnectionUpdatedTabMessage;

export type TabMessageResponse = {
  [TabMessageType.StartConnection]: Readonly<{ 
    peerId?: string 
  }>;
  [TabMessageType.CheckConnection]: Readonly<{ 
    peerId?: string 
    connected: boolean,
  }>;
  [TabMessageType.ConnectionUpdated]: undefined;
};
