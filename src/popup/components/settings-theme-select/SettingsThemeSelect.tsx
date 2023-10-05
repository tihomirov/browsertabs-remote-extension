import {GridCell} from '@rmwc/grid';
import {Select} from '@rmwc/select';
import {Typography} from '@rmwc/typography';
import React, {FC, FormEvent, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import {SettingsTheme} from '../../services';
import s from './styles.module.scss';

type SettingsThemeSelectProps = Readonly<{
  value: SettingsTheme;
  onValueChange: (theme: SettingsTheme) => void;
}>;

const themeOptions = [
  {
    label: 'Light Crystal Blue',
    value: SettingsTheme.LightCrystalBlue
  },
  {
    label: 'Dark Crystal Blue',
    value: SettingsTheme.DarkCrystalBlue
  },
  {
    label: 'Deep Black',
    value: SettingsTheme.DeepBlack
  }
];

export const SettingsThemeSelect: FC<SettingsThemeSelectProps> = ({value, onValueChange}) => {
  const {t} = useTranslation();

  const onChange = useCallback((event: FormEvent<HTMLSelectElement>) => {
    onValueChange(event.currentTarget.value as SettingsTheme);
  }, [onValueChange]);

  return (
    <>
      <GridCell align='middle' span={2}>
        <Typography use="headline6">{t('common:settings-color-theme')}</Typography>
      </GridCell>
      <GridCell className={s.control} align='middle' span={2}>
        <Select
          enhanced
          defaultValue={value}
          options={themeOptions}
          onChange={onChange}
        />
      </GridCell>
    </>
  );
};
