import {Action, ActionType} from 'browsertabs-remote-common/src/common';

import {assertUnreachable} from '../../common/utils';
import {MessageService} from '../services';

import {ActionCommand} from './actions';
import {CloseActionCommand} from './close-tab-action';
import {CreateActionCommand} from './create-tab-action';
import {DecreaseZoomActionCommand} from './descrease-zoom-action';
import {IncreaseZoomActionCommand} from './increase-zoom-action';
import {ReloadActionCommand} from './reload-tab-action';
import {SetZoomActionCommand} from './set-zoom-action';
import {ToggleMuteActionCommand} from './toggle-mute-tab-action';

export function createAction(action: Action, messageService: MessageService): ActionCommand<Action> {
  const type = action.type;

  switch (type) {
  case ActionType.Close: {
    return new CloseActionCommand(action, messageService);
  }
  case ActionType.Reload: {
    return new ReloadActionCommand(action, messageService);
  }
  case ActionType.ToggleMute: {
    return new ToggleMuteActionCommand(action, messageService);
  }
  case ActionType.IncreaseZoom: {
    return new IncreaseZoomActionCommand(action, messageService);
  }
  case ActionType.DecreaseZoom: {
    return new DecreaseZoomActionCommand(action, messageService);
  }
  case ActionType.SetZoom: {
    return new SetZoomActionCommand(action, messageService);
  }
  case ActionType.Create: {
    return new CreateActionCommand(action, messageService);
  }
  default: {
    assertUnreachable(type);
  }
  }
}
