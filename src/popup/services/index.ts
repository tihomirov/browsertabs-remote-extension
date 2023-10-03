import browser from 'webextension-polyfill';

import {StorageService} from '../../common/services';

export * from './settings-service';
export * from './tabs-service';

export const storageService = new StorageService(browser);