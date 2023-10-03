import {Grid, GridRow} from '@rmwc/grid';
import {observer} from 'mobx-react-lite';
import React, {FC, useCallback} from 'react';

import {Loader} from '../components/loader';
import {SettingsThemeSelect} from '../components/settings-theme';
import {useStores} from '../hooks';
import {SettingsTheme} from '../services';

export const Settings: FC = observer(() => {
  const {settingsStore} = useStores();

  const onThemeChange = useCallback((theme: SettingsTheme) => {
    settingsStore.saveTheme(theme);
  }, [settingsStore]);

  if (!settingsStore.theme) {
    return <Loader size="xlarge" />;
  }

  return (
    <Grid>
      <GridRow>
        <SettingsThemeSelect theme={settingsStore.theme} onThemeChange={onThemeChange} />
      </GridRow>
    </Grid>
  );
});
