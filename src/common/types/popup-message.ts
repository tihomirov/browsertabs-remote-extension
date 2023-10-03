import {isEnum,typeguard} from '../utils';

export enum PopupMessageType {
  StartConnection,
  RestartConnection,
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

export type RestartConnectionPopupMessage = Readonly<{
  popupMessagetype: PopupMessageType.RestartConnection;
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
