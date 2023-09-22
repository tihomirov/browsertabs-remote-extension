import {CreateAction} from 'browsertabs-remote-common/src/common';

import {ActionCommand} from './actions';

export class CreateActionCommand extends ActionCommand<CreateAction> {
  async run() {
    window.open(this._action.url, '_blank')?.focus();
  }
}
