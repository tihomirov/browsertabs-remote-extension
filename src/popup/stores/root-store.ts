import {SettingsStore} from './settings-store';
import {TabsStore} from './tabs-store';

export class RootStore {
  tabsStore: TabsStore;
  settingsStore: SettingsStore;

  constructor() {
    this.tabsStore = new TabsStore();
    this.settingsStore = new SettingsStore();
  }
}
