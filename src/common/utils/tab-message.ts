import {TabMessage, TabMessageType} from '../types'
import {typeguard, isEnum} from '../utils'


export const tabMessageTypeguard = typeguard<TabMessage>(
  ['type', isEnum(TabMessageType)],
);
