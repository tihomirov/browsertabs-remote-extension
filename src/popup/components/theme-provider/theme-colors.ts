
import {SettingsTheme} from '../../services';

const lightCrystalBlueTheme = {
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

const darkCrystalBlueTheme = {
  primary: '#24aee9',
  secondary: '#e539ff',
  error: '#b00020',
  background: '#212121',
  surface: '#37474F',
  onPrimary: 'rgba(255,255,255,.87)',
  onSecondary: 'rgba(0,0,0,0.87)',
  onSurface: 'rgba(255,255,255,.87)',
  onError: '#fff',
  textPrimaryOnBackground: 'rgba(255, 255, 255, 1)',
  textSecondaryOnBackground: 'rgba(255, 255, 255, 0.7)',
  textHintOnBackground: 'rgba(255, 255, 255, 0.5)',
  textDisabledOnBackground: 'rgba(255, 255, 255, 0.5)',
  textIconOnBackground: 'rgba(255, 255, 255, 0.5)',
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

const deepBlackTheme = {
  primary: '#001524',
  secondary: '#445D48',
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

export const themesOptions: Record<SettingsTheme, {[key: string]: string}> = {
  [SettingsTheme.DeepBlack]: deepBlackTheme,
  [SettingsTheme.LightCrystalBlue]: lightCrystalBlueTheme,
  [SettingsTheme.DarkCrystalBlue]: darkCrystalBlueTheme,
};