import {typeguard, isEnum} from '../utils'

export enum PopupMessageType {
  StartConnection,
  CloseConnection,
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

export type PopupMessage = StartConnectionPopupMessage | CloseConnectionPopupMessage;

export const popupMessageTypeguard = typeguard<PopupMessage>(
  ['popupMessagetype', isEnum(PopupMessageType)],
);
