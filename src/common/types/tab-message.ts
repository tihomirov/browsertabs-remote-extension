export enum TabMessageType {
  StartConnection = 'StartConnection',
  CloseConnection = 'CloseConnection',
  CheckConnection = 'CheckConnection',
  ConnectionUpdated = 'ConnectionUpdated',
}

export type StartConnectionTabMessage = Readonly<{
  type: TabMessageType.StartConnection;
}>;

export type CloseConnectionTabMessage = Readonly<{
  type: TabMessageType.CloseConnection;
}>;

export type CheckConnectionTabMessage = Readonly<{
  type: TabMessageType.CheckConnection;
}>;

export type ConnectionUpdatedTabMessage = Readonly<{
  type: TabMessageType.ConnectionUpdated;
  connected: boolean;
}>;

export type TabMessage = StartConnectionTabMessage 
  | CloseConnectionTabMessage 
  | CheckConnectionTabMessage 
  | ConnectionUpdatedTabMessage;

export type TabMessageResponse = {
  [TabMessageType.StartConnection]: Readonly<{ 
    peerId?: string 
  }>;
  [TabMessageType.CloseConnection]: undefined;
  [TabMessageType.CheckConnection]: Readonly<{ 
    peerId?: string 
    connected: boolean,
  }>;
  [TabMessageType.ConnectionUpdated]: undefined;
};
