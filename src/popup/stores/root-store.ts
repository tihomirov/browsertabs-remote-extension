import {ErrorStore} from './error-store';
import {SettingsStore} from './settings-store';
import {TabsStore} from './tabs-store';

export class RootStore {
  tabsStore: TabsStore;
  settingsStore: SettingsStore;
  errorStore: ErrorStore;

  constructor() {
    this.tabsStore = new TabsStore(this);
    this.settingsStore = new SettingsStore();
    this.errorStore = new ErrorStore();
  }
}
