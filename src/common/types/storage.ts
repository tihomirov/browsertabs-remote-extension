import {typeguard, isEnum, isString} from '../utils'
import {ConnectionStatus} from './popup-message'

export const CONNECTION_STATUS_STORAGE_KEY = 'connectionStatus';

export type ConnectionUpdate = Readonly<{
  status: ConnectionStatus;
  peerId?: string;
  error?: string;
}>;

export type ConnectionsStatus = Record<string, ConnectionUpdate>;

export const connectionUpdateTypeguard = typeguard<ConnectionUpdate>(
  ['status', isEnum(ConnectionStatus)],
  ['peerId', isString, true],
  ['error', isString, true],
);
