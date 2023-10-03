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

  async saveTheme(theme: SettingsTheme): Promise<void> {
    if (!this._settings) {
      return;
    }

    runInAction(() => this._settings = {
      ...this._settings,
      theme,
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
