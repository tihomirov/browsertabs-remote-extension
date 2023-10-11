import {GridCell} from '@rmwc/grid';
import {Select} from '@rmwc/select';
import {Typography} from '@rmwc/typography';
import React, {FC, FormEvent, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import s from './styles.module.scss';

type SettingsConnectionTtlProps = Readonly<{
  value: number;
  onValueChange: (value: number) => void;
}>;

const themeOptions = [
  {
    label: '1 Hour',
    value: (1 * 60 * 60).toString(),
  },
  {
    label: '2 Hours',
    value: (2 * 60 * 60).toString(),
  },
  {
    label: '3 Hours',
    value: (3 * 60 * 60).toString(),
  }
];

export const SettingsConnectionTtl: FC<SettingsConnectionTtlProps> = ({value, onValueChange}) => {
  const {t} = useTranslation();

  const onChange = useCallback((event: FormEvent<HTMLSelectElement>) => {
    const value = parseInt(event.currentTarget.value); // sec
    onValueChange(value);
  }, [onValueChange]);

  return (
    <>
      <GridCell align='middle' span={2}>
        <Typography use="headline6">{t('common:settings-color-theme')}</Typography>
      </GridCell>
      <GridCell className={s.control} align='middle' span={2}>
        <Select
          enhanced
          defaultValue={value.toString()}
          options={themeOptions}
          onChange={onChange}
        />
      </GridCell>
    </>
  );
};
