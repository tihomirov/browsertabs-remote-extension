import {Action} from 'browsertabs-remote-common/src/common';

import {MessageService} from '../services';

export abstract class ActionCommand<TAction extends Action> {
  constructor(protected readonly _action: TAction, protected readonly _messageService: MessageService) {}
  abstract run(): Promise<void>;
}
