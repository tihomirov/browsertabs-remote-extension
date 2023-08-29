import {TabsStore} from './tabs-store';

export class RootStore {
  tabsStore: TabsStore;

  constructor() {
    this.tabsStore = new TabsStore();
  }
}
