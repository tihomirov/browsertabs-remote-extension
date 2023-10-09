import {computed, makeObservable, observable, runInAction} from 'mobx';

import {Settings, settingsService, SettingsTheme} from '../services';

export class SettingsStore {
  @observable
  private _settings: Settings | undefined = undefined;

  constructor() {
    makeObservable(this);

    void this.fetchSettings();
  }

  @computed
  get theme(): SettingsTheme | undefined {
    return this._settings?.theme;
  }

  @computed
  get autoStartConnection(): boolean {
    return this._settings?.autoStartConnection ?? true;
  }

  @computed
  get connectionTtl(): number {
    return 2 * 60 * 60; // sec
  }

  async saveTheme(theme: SettingsTheme): Promise<void> {
    runInAction(() => this._settings = {
      ...this._settings,
      theme,
    });
    await settingsService.saveSettings(this._settings);
  }

  async saveAutoStartConnection(autoStartConnection: boolean): Promise<void> {
    runInAction(() => this._settings = {
      ...this._settings,
      autoStartConnection,
    });
    await settingsService.saveSettings(this._settings);
  }

  private async fetchSettings(): Promise<void> {
    const settings = await settingsService.getSettings();

    runInAction(() => {
      this._settings = settings;
    });
  }
}
