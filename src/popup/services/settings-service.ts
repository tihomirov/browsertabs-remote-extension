import {storage} from 'webextension-polyfill';

export enum SettingsTheme {
  LightCrystalBlue = 'LightCrystalBlue',
  DarkCrystalBlue = 'DarkCrystalBlue',
  DeepBlack = 'DeepBlack',
}

export type Settings = Readonly<{
  theme?: SettingsTheme
  autoStartConnection?: boolean;
  connectionTtl?: number;
}>;

const SETTINGS_STORAGE_KEY = 'settings';

const DEFAULT_SETTINGS = {
  theme: SettingsTheme.LightCrystalBlue,
  autoStartConnection: true,
};

class SettingsService {
  async getSettings(): Promise<Settings> {
    const data = await storage.local.get(SETTINGS_STORAGE_KEY);
    return data[SETTINGS_STORAGE_KEY] ?? DEFAULT_SETTINGS;
  }

  async saveSettings(
    settings: Settings = DEFAULT_SETTINGS
  ): Promise<void> {
    await storage.local.set({[SETTINGS_STORAGE_KEY]: settings});
  }

}

export const settingsService = new SettingsService();
