import {CloseAction} from 'browsertabs-remote-common/src/common';

import {ActionCommand} from './actions';
import {BackgroundMessageType} from '../../common/types';

export class CloseActionCommand extends ActionCommand<CloseAction> {
  async run() {
    this._messageService.sendBackgroundMessage({
      backgroundMessageType: BackgroundMessageType.CloseTab,
    });
  }
}
