import * as i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import uaCommon from './locales/ua/common.json';

export const resources = {
  en: {
    common: enCommon,
  },
  ua: {
    common: uaCommon,
  },
} as const;

i18n
// learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
// pass the i18n instance to react-i18next.
  .use(initReactI18next)
// init i18next
// for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    // debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
