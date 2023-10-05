import {GridCell} from '@rmwc/grid';
import {Switch} from '@rmwc/switch';
import {Typography} from '@rmwc/typography';
import React, {FC, FormEvent, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import s from './styles.module.scss';

type SettingsAutoStartConnectionProps = Readonly<{
  value: boolean;
  onValueChange: (value: boolean) => void;
}>;

export const SettingsAutoStartConnection: FC<SettingsAutoStartConnectionProps> = (
  {value, onValueChange}
) => {
  const {t} = useTranslation();

  const onChange = useCallback((event: FormEvent<HTMLInputElement>) => {
    onValueChange(event.currentTarget.checked);
  }, [onValueChange]);

  return (
    <>
      <GridCell align='middle' span={2}>
        <Typography use="headline6">{t('common:settings-auto-start-connection')}</Typography>
      </GridCell>
      <GridCell className={s.control} align='middle' span={2}>
        <Switch
          checked={value}
          onChange={onChange}
        />
      </GridCell>
    </>
  );
};
