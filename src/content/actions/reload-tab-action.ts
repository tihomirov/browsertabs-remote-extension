import {ReloadAction} from 'browsertabs-remote-common/src/common';

import {ActionCommand} from './actions';

export class ReloadActionCommand extends ActionCommand<ReloadAction> {
  async run() {
    window.location.reload();
  }
}
