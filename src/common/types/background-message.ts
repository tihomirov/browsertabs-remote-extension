import {typeguard, isEnum} from '../utils'

export enum BackgroundMessageType {
  RequestTabId,
  ResponseTabId,
  DecreaseZoom,
  IncreaseZoom,
  SetZoom,
  ToggleMute,
  CloseTab,
}

export type RequestTabIdBackgroundMessage = Readonly<{
  backgroundMessageType: BackgroundMessageType.RequestTabId;
}>;

export type ResponseTabIdBackgroundMessage = Readonly<{
  backgroundMessageType: BackgroundMessageType.ResponseTabId;
  tabId: number;
}>;

export type DecreaseZoomBackgroundMessage = Readonly<{
  backgroundMessageType: BackgroundMessageType.DecreaseZoom;
}>;

export type IncreaseZoomBackgroundMessage = Readonly<{
  backgroundMessageType: BackgroundMessageType.IncreaseZoom;
}>;

export type SetZoomBackgroundMessage = Readonly<{
  backgroundMessageType: BackgroundMessageType.SetZoom;
  zoomFactor: number;
}>;

export type ToggleMuteBackgroundMessage = Readonly<{
  backgroundMessageType: BackgroundMessageType.ToggleMute;
}>;

export type CloseTabBackgroundMessage = Readonly<{
  backgroundMessageType: BackgroundMessageType.CloseTab;
}>;

export type BackgroundMessage = RequestTabIdBackgroundMessage |
  ResponseTabIdBackgroundMessage | 
  DecreaseZoomBackgroundMessage | 
  IncreaseZoomBackgroundMessage | 
  SetZoomBackgroundMessage | 
  CloseTabBackgroundMessage | 
  ToggleMuteBackgroundMessage;

export const backgroundMessageTypeguard = typeguard<BackgroundMessage>(
  ['backgroundMessageType', isEnum(BackgroundMessageType)],
);
  