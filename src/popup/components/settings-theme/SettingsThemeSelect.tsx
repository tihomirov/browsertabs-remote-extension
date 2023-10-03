import {GridCell} from '@rmwc/grid';
import {Select} from '@rmwc/select';
import {Typography} from '@rmwc/typography';
import React, {FC, FormEvent, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import {SettingsTheme} from '../../services';
import s from './styles.module.scss';

type SettingsThemeSelectProps = Readonly<{
  theme: SettingsTheme;
  onThemeChange: (theme: SettingsTheme) => void;
}>;

const themeOptions = [
  {
    label: 'Light Crystal Blue',
    value: SettingsTheme.LightCrystalBlue
  },
  {
    label: 'Deep Black',
    value: SettingsTheme.DeepBlack
  }
];

export const SettingsThemeSelect: FC<SettingsThemeSelectProps> = ({theme, onThemeChange}) => {
  const {t} = useTranslation();

  const onChange = useCallback((event: FormEvent<HTMLSelectElement>) => {
    onThemeChange(event.currentTarget.value as SettingsTheme);
  }, [onThemeChange]);

  return (
    <>
      <GridCell className={s.label} span={2}>
        <Typography use="headline6">{t('common:color-theme')}</Typography>
      </GridCell>
      <GridCell span={2}>
        <Select
          enhanced
          defaultValue={theme}
          options={themeOptions}
          onChange={onChange}
        />
      </GridCell>
    </>
  );
};
