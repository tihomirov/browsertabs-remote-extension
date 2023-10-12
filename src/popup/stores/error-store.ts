import {Observable, Subject} from 'rxjs';

import {isString} from '../../common/utils';

export class ErrorStore {
  private readonly _error$ = new Subject<string>();

  get error$(): Observable<string> {
    return this._error$;
  }

  addError(error: unknown): void {
    if (isString(error)) {
      this._error$.next(error);
    } else if (error instanceof Error) {
      this._error$.next(error.message);
    } else {
      this._error$.next(`${error}`);
    }
  }

}
