import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';

import {BackgroundMessageType, ResponseTabIdBackgroundMessage} from '../../common/types';
import {MessageService} from './message-service';

export class TabService {
  private readonly _unsubscribeSubject$ = new Subject<void>();
  private readonly _tabId$ = new BehaviorSubject<number | undefined>(undefined);

  constructor(private readonly _messageService: MessageService) {
  }

  dispose(): void {
    this._unsubscribeSubject$.next();
    this._unsubscribeSubject$.complete();
  }

  get tabId$(): Observable<number> {
    const tabId$ = this._messageService.backgroundMessage$.pipe(
      takeUntil(this._unsubscribeSubject$),
      filter(message => message.backgroundMessageType === BackgroundMessageType.ResponseTabId),
      map((message: ResponseTabIdBackgroundMessage) => message.tabId)
    )

    this._messageService.sendBackgroundMessage({backgroundMessageType: BackgroundMessageType.RequestTabId})

    return tabId$;
  }

  getTabInfo() {
    return {
      title: window.document.title,
      favIconUrl: document.querySelector<HTMLLinkElement>('link[rel*=\'icon\']')?.href,
    }
  }
}