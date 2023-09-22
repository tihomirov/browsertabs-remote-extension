import {BackgroundMessage, BackgroundMessageType} from '../types'
import {typeguard, isEnum} from '../utils'

export const backgroundMessageTypeguard = typeguard<BackgroundMessage>(
  ['backgroundMessageType', isEnum(BackgroundMessageType)],
);
