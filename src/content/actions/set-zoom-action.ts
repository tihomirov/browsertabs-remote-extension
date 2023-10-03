import {SetZoomAction} from 'browsertabs-remote-common/src/common';

import {BackgroundMessageType} from '../../common/types';
import {ActionCommand} from './actions';

export class SetZoomActionCommand extends ActionCommand<SetZoomAction> {
  async run() {
    this._messageService.sendBackgroundMessage({
      backgroundMessageType: BackgroundMessageType.SetZoom,
      zoomFactor: this._action.zoomFactor,
    });
  }
}
