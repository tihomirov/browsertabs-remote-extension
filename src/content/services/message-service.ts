import {Observable, Subject} from 'rxjs';
import browser from 'webextension-polyfill';

import {BackgroundMessage, TabMessage, tabMessageTypeguard, backgroundMessageTypeguard} from '../../common/types';

export class MessageService {
  private readonly _tabMessage$ = new Subject<TabMessage>();
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

  get tabMessage$(): Observable<TabMessage> {
    return this._tabMessage$;
  }

  get backgroundMessage$(): Observable<BackgroundMessage> {
    return this._backgroundMessage$;
  }

  private readonly onMessage = (message: unknown): true | void => {
    if (tabMessageTypeguard(message)) {
      return this._tabMessage$.next(message);
    }

    if (backgroundMessageTypeguard(message)) {
      return this._backgroundMessage$.next(message)
    }
  }
}
