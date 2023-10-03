import {storage} from 'webextension-polyfill';

export enum SettingsTheme {
  LightCrystalBlue = 'LightCrystalBlue',
  DeepBlack = 'DeepBlack',
}

export type Settings = Readonly<{
  theme?: SettingsTheme
}>;

const SETTINGS_STORAGE_KEY = 'settings';

const DEFAULT_SETTINGS = {
  theme: SettingsTheme.LightCrystalBlue
};

class SettingsService {
  async getSettings(): Promise<Settings> {
    const data = await storage.local.get(SETTINGS_STORAGE_KEY);
    return data[SETTINGS_STORAGE_KEY] ?? DEFAULT_SETTINGS;
  }

  async saveSettings(
    settings: Settings
  ): Promise<void> {
    await storage.local.set({[SETTINGS_STORAGE_KEY]: settings});
  }

}

export const settingsService = new SettingsService();
