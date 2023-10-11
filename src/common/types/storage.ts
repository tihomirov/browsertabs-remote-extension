import {isEnum, isNumber, isString,typeguard} from '../utils';
import {ConnectionStatusType} from './popup-message';

export const CONNECTION_STATUS_STORAGE_KEY = 'connectionStatus';

export type ConnectionStatus = Readonly<{
  status: ConnectionStatusType;
  error: string | undefined;
  updatedAt: number;
  connectedAt?: number;
  openAt?: number;
  peerId?: string;
  ttl?: number;
}>;

export type ConnectionsStatus = Record<string, ConnectionStatus>;

export const connectionUpdateTypeguard = typeguard<ConnectionStatus>(
  ['status', isEnum(ConnectionStatusType)],
  ['updatedAt', isNumber],
  ['peerId', isString, true],
  ['error', isString, true],
  ['connectedAt', isNumber, true],
  ['openAt', isNumber, true],
);
