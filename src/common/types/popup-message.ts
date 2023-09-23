import {typeguard, isEnum} from '../utils'

export enum PopupMessageType {
  StartConnection,
  CloseConnection,
  // CheckConnection,
  RequestConnectionUpdated,
  ConnectionUpdated,
}

export enum ConnectionStatus {
	Closed,
	Error,
	Open,
	Connected,
}

export type StartConnectionPopupMessage = Readonly<{
  popupMessagetype: PopupMessageType.StartConnection;
}>;

export type CloseConnectionPopupMessage = Readonly<{
  popupMessagetype: PopupMessageType.CloseConnection;
}>;

export type RequestConnectionUpdatedPopupMessage = Readonly<{
  popupMessagetype: PopupMessageType.RequestConnectionUpdated;
}>;

export type ConnectionUpdatedPopupMessage = Readonly<{
  popupMessagetype: PopupMessageType.ConnectionUpdated;
  status: ConnectionStatus;
  peerId?: string;
  error?: string
}>;

export type PopupMessage = StartConnectionPopupMessage 
  | CloseConnectionPopupMessage 
  | RequestConnectionUpdatedPopupMessage 
  | ConnectionUpdatedPopupMessage;

export const popupMessageTypeguard = typeguard<PopupMessage>(
  ['popupMessagetype', isEnum(PopupMessageType)],
);
