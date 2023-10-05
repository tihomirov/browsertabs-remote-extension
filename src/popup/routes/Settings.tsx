import {Grid, GridRow} from '@rmwc/grid';
import {observer} from 'mobx-react-lite';
import React, {FC, useCallback} from 'react';

import {Loader} from '../components/loader';
import {SettingsAutoStartConnection} from '../components/settings-auto-start-connection';
import {SettingsThemeSelect} from '../components/settings-theme-select';
import {useStores} from '../hooks';
import {SettingsTheme} from '../services';

export const Settings: FC = observer(() => {
  const {settingsStore} = useStores();

  const onThemeChange = useCallback((theme: SettingsTheme) => {
    settingsStore.saveTheme(theme);
  }, [settingsStore]);

  const onValueChange = useCallback((value: boolean) => {
    settingsStore.saveAutoStartConnection(value);
  }, [settingsStore]);

  if (!settingsStore.theme) {
    return <Loader size="xlarge" />;
  }

  return (
    <Grid>
      <SettingsThemeSelect value={settingsStore.theme} onValueChange={onThemeChange} />
      <SettingsAutoStartConnection
        value={settingsStore.autoStartConnection}
        onValueChange={onValueChange}
      />
    </Grid>
  );
});
