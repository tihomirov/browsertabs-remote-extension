import {DecreaseZoomAction} from 'browsertabs-remote-common/src/common';

import {BackgroundMessageType} from '../../common/types';
import {ActionCommand} from './actions';

export class DecreaseZoomActionCommand extends ActionCommand<DecreaseZoomAction> {
  async run() {
    this._messageService.sendBackgroundMessage({
      backgroundMessageType: BackgroundMessageType.DecreaseZoom,
    });
  }
}
