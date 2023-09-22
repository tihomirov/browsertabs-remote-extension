import {Observable, Subject} from 'rxjs';
import browser from 'webextension-polyfill';

import {BackgroundMessage, TabMessage} from '../../common/types';
import {tabMessageTypeguard, backgroundMessageTypeguard} from '../../common/utils';

type SendResponse = (value: unknown) => void;

export class MessageService {
  private readonly _tabMessage$ = new Subject<[TabMessage, SendResponse]>();
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

  sendTabMessage(message: TabMessage): void {
    this._browser.runtime.sendMessage(message);
  }

  get tabMessage$(): Observable<[TabMessage, SendResponse]> {
    return this._tabMessage$;
  }

  get backgroundMessage$(): Observable<BackgroundMessage> {
    return this._backgroundMessage$;
  }

  private readonly onMessage = (message, _sender, sendResponse): true | void => {
    if (tabMessageTypeguard(message)) {
      return this._tabMessage$.next([message, sendResponse]);
    }

    if (backgroundMessageTypeguard(message)) {
      return this._backgroundMessage$.next(message)
    }
  }
}
