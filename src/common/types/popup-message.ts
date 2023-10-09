import {isEnum,typeguard} from '../utils';

export enum PopupMessageType {
  StartConnection,
  RestartConnection,
  CloseConnection,
}

export enum ConnectionStatusType {
	Closed,
	Error,
	Open,
	Connected,
}

export type StartConnectionPopupMessage = Readonly<{
  popupMessagetype: PopupMessageType.StartConnection;
  ttl: number;
}>;

export type RestartConnectionPopupMessage = Readonly<{
  popupMessagetype: PopupMessageType.RestartConnection;
  ttl: number;
}>;

export type CloseConnectionPopupMessage = Readonly<{
  popupMessagetype: PopupMessageType.CloseConnection;
}>;

export type PopupMessage = StartConnectionPopupMessage |
  RestartConnectionPopupMessage |
  CloseConnectionPopupMessage;

export const popupMessageTypeguard = typeguard<PopupMessage>(
  ['popupMessagetype', isEnum(PopupMessageType)],
);
