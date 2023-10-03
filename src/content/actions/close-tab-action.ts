import {CloseAction} from 'browsertabs-remote-common/src/common';

import {BackgroundMessageType} from '../../common/types';
import {ActionCommand} from './actions';

export class CloseActionCommand extends ActionCommand<CloseAction> {
  async run() {
    this._messageService.sendBackgroundMessage({
      backgroundMessageType: BackgroundMessageType.CloseTab,
    });
  }
}
