import {Observable, Subject} from 'rxjs';
import browser from 'webextension-polyfill';

import {
  BackgroundMessage,
  backgroundMessageTypeguard,
  PopupMessage,
  popupMessageTypeguard
} from '../../common/types';

export class MessageService {
  private readonly _tabMessage$ = new Subject<PopupMessage>();
  private readonly _backgroundMessage$ = new Subject<BackgroundMessage>();

  constructor(private readonly _browser: browser.Browser) {
    this._browser.runtime.onMessage.addListener(this.onMessage);
  }

  dispose(): void {
    this._browser.runtime.onMessage.removeListener(this.onMessage);
  }

  sendBackgroundMessage(message: BackgroundMessage): void {
    this._browser.runtime.sendMessage(message);
  }

  sendPopupMessage(message: PopupMessage): void {
    this._browser.runtime.sendMessage(message);
  }

  get tabMessage$(): Observable<PopupMessage> {
    return this._tabMessage$;
  }

  get backgroundMessage$(): Observable<BackgroundMessage> {
    return this._backgroundMessage$;
  }

  private readonly onMessage = (message: unknown): true | void => {
    if (popupMessageTypeguard(message)) {
      return this._tabMessage$.next(message);
    }

    if (backgroundMessageTypeguard(message)) {
      return this._backgroundMessage$.next(message);
    }
  };
}
