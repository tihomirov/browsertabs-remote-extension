import {ToggleMuteAction} from 'browsertabs-remote-common/src/common';

import {ActionCommand} from './actions';
import {BackgroundMessageType} from '../../common/types';

export class ToggleMuteActionCommand extends ActionCommand<ToggleMuteAction> {
  async run(): Promise<void> {
    this._messageService.sendBackgroundMessage({
      backgroundMessageType: BackgroundMessageType.ToggleMute,
    });
  }
}
