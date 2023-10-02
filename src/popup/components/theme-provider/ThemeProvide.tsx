import React, {FC, PropsWithChildren} from 'react';
import {ThemeProvider as RmwcThemeProvider} from '@rmwc/theme';

import s from './styles.module.scss';

const defaultTheme = {
  primary: '#6096B4',
  secondary: '#fa3336',
  error: '#93BFCF',
  background: '#EEE9DA',
  surface: '#fff',
  onPrimary: 'rgba(255, 255, 255, 1)',
  onSecondary: 'rgba(255, 255, 255, 1)',
  onSurface: 'rgba(0, 0, 0, 0.87)',
  onError: '#fff',
  textPrimaryOnBackground: 'rgba(0, 0, 0, 0.87)',
  textSecondaryOnBackground: 'rgba(0, 0, 0, 0.54)',
  textHintOnBackground: 'rgba(0, 0, 0, 0.38)',
  textDisabledOnBackground: 'rgba(0, 0, 0, 0.38)',
  textIconOnBackground: 'rgba(0, 0, 0, 0.38)',
  textPrimaryOnLight: 'rgba(0, 0, 0, 0.87)',
  textSecondaryOnLight: 'rgba(0, 0, 0, 0.54)',
  textHintOnLight: 'rgba(0, 0, 0, 0.38)',
  textDisabledOnLight: 'rgba(0, 0, 0, 0.38)',
  textIconOnLight: 'rgba(0, 0, 0, 0.38)',
  textPrimaryOnDark: 'white',
  textSecondaryOnDark: 'rgba(255, 255, 255, 0.7)',
  textHintOnDark: 'rgba(255, 255, 255, 0.5)',
  textDisabledOnDark: 'rgba(255, 255, 255, 0.5)',
  textIconOnDark: 'rgba(255, 255, 255, 0.5)'
};

export const ThemeProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <RmwcThemeProvider className={s.container} options={defaultTheme}>
      {children}
    </RmwcThemeProvider>
  );
};
