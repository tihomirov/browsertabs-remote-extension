import {IncreaseZoomAction} from 'browsertabs-remote-common/src/common';

import {BackgroundMessageType} from '../../common/types';
import {ActionCommand} from './actions';


export class IncreaseZoomActionCommand extends ActionCommand<IncreaseZoomAction> {
  async run() {
    this._messageService.sendBackgroundMessage({
      backgroundMessageType: BackgroundMessageType.IncreaseZoom,
    });
  }
}
