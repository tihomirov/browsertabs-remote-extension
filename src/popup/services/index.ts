import browser from 'webextension-polyfill';

import {StorageService} from '../../common/services';

export * from './tabs-service';
export const storageService = new StorageService(browser);