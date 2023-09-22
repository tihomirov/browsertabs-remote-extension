import {DecreaseZoomAction} from 'browsertabs-remote-common/src/common';

import {ActionCommand} from './actions';
import {BackgroundMessageType} from '../../common/types';

export class DecreaseZoomActionCommand extends ActionCommand<DecreaseZoomAction> {
  async run() {
    this._messageService.sendBackgroundMessage({
      backgroundMessageType: BackgroundMessageType.DecreaseZoom,
    });
  }
}
