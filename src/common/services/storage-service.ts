import {Observable, Subject} from 'rxjs';
import {Browser, Storage} from 'webextension-polyfill';

import {
  CONNECTION_STATUS_STORAGE_KEY,
  ConnectionsStatus,
  ConnectionStatus,
  connectionUpdateTypeguard
} from '../../common/types';

type ConnectionUpdateData = Readonly<{
  tabId: number;
  update: ConnectionStatus;
}>;

export class StorageService {
  private readonly _connectionUpdate$ = new Subject<ConnectionUpdateData>();

  constructor(private readonly _browser: Browser) {
    this._browser.storage.onChanged.addListener(this.onStorageListener);
  }

  dispose(): void {
    this._browser.storage.onChanged.removeListener(this.onStorageListener);
  }

  get connectionUpdate$(): Observable<ConnectionUpdateData> {
    return this._connectionUpdate$;
  }

  async setConnectionStatusUpdate(
    tabId: number,
    update: Omit<ConnectionStatus, 'updatedAt'>
  ): Promise<void> {
    const data = await this._browser.storage.local.get(CONNECTION_STATUS_STORAGE_KEY);
    const connectionsStatus = data[CONNECTION_STATUS_STORAGE_KEY] ?? {};
    const connectionStatus = connectionsStatus[tabId];

    connectionsStatus[tabId] = {
      ...connectionStatus,
      ...update,
      updatedAt: Date.now()
    };

    await this._browser.storage.local.set({[CONNECTION_STATUS_STORAGE_KEY]: connectionsStatus});
  }

  async getConnectionStatus(
    tabId: number,
  ): Promise<ConnectionStatus | undefined> {
    const data = await this._browser.storage.local.get(CONNECTION_STATUS_STORAGE_KEY);
    return data[CONNECTION_STATUS_STORAGE_KEY]?.[tabId];
  }

  async getConnectionsStatus(): Promise<ConnectionsStatus | undefined> {
    const data = await this._browser.storage.local.get(CONNECTION_STATUS_STORAGE_KEY);
    return data[CONNECTION_STATUS_STORAGE_KEY];
  }

  private readonly onStorageListener = (
    changes: Record<string, Storage.StorageChange>,
    namespace: string
  ): void => {
    if (namespace !== 'local') {
      return;
    }

    const connectionStatusChanges = changes[CONNECTION_STATUS_STORAGE_KEY];
    const newValue = connectionStatusChanges?.newValue;

    if (!newValue) {
      return;
    }

    for (const [tabId, update] of Object.entries(newValue)) {
      if (connectionUpdateTypeguard(update)) {
        this._connectionUpdate$.next({
          tabId: Number(tabId),
          update,
        });
      }
    }
  };
}
