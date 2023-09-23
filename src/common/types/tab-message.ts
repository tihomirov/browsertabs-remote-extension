import {typeguard, isEnum} from '../utils'

export enum TabMessageType {
  StartConnection = 'StartConnection',
  CloseConnection = 'CloseConnection',
  // CheckConnection = 'CheckConnection',
  RequestConnectionUpdated = 'RequestConnectionUpdated',
  ConnectionUpdated = 'ConnectionUpdated',
}

export enum ConnectionStatus {
	Closed,
	Error,
	Open,
	Connected,
}

export type StartConnectionTabMessage = Readonly<{
  type: TabMessageType.StartConnection;
}>;

export type CloseConnectionTabMessage = Readonly<{
  type: TabMessageType.CloseConnection;
}>;

export type RequestConnectionUpdatedTabMessage = Readonly<{
  type: TabMessageType.RequestConnectionUpdated;
}>;

export type ConnectionUpdatedTabMessage = Readonly<{
  type: TabMessageType.ConnectionUpdated;
  status: ConnectionStatus;
  peerId?: string;
  error?: string
}>;

export type TabMessage = StartConnectionTabMessage 
  | CloseConnectionTabMessage 
  | RequestConnectionUpdatedTabMessage 
  | ConnectionUpdatedTabMessage;

export type TabMessageResponse = {
  [TabMessageType.StartConnection]: void;
  [TabMessageType.CloseConnection]: undefined;
  [TabMessageType.RequestConnectionUpdated]: undefined;
  [TabMessageType.ConnectionUpdated]: undefined;
};

export const tabMessageTypeguard = typeguard<TabMessage>(
  ['type', isEnum(TabMessageType)],
);
