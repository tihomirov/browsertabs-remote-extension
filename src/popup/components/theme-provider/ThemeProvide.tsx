import {ThemeProvider as RmwcThemeProvider} from '@rmwc/theme';
import {observer} from 'mobx-react-lite';
import React, {FC, PropsWithChildren} from 'react';

import {useStores} from '../../hooks';
import {Loader} from '../loader';
import s from './styles.module.scss';
import {themesOptions} from './theme-colors';

export const ThemeProvider: FC<PropsWithChildren> = observer(({children}) => {
  const {settingsStore} = useStores();

  if (!settingsStore.theme) {
    return <Loader size="xlarge" />;
  }

  return (
    <RmwcThemeProvider className={s.container} options={themesOptions[settingsStore.theme]}>
      {children}
    </RmwcThemeProvider>
  );
});
