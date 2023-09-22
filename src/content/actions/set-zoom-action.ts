import {SetZoomAction} from 'browsertabs-remote-common/src/common';

import {ActionCommand} from './actions';
import {BackgroundMessageType} from '../../common/types';

export class SetZoomActionCommand extends ActionCommand<SetZoomAction> {
  async run() {
    this._messageService.sendBackgroundMessage({
      backgroundMessageType: BackgroundMessageType.SetZoom,
      zoomFactor: this._action.zoomFactor,
    });
  }
}
