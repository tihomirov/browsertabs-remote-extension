import {ToggleMuteAction} from 'browsertabs-remote-common/src/common';

import {BackgroundMessageType} from '../../common/types';
import {ActionCommand} from './actions';

export class ToggleMuteActionCommand extends ActionCommand<ToggleMuteAction> {
  async run(): Promise<void> {
    this._messageService.sendBackgroundMessage({
      backgroundMessageType: BackgroundMessageType.ToggleMute,
    });
  }
}
