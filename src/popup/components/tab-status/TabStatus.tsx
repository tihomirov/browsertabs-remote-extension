import classNames from 'classnames';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Typography} from '@rmwc/typography';

import {ConnectionStatus} from '../../../common/types';
import s from './styles.module.scss';

type TabStatusProps = Readonly<{
  status: ConnectionStatus;
}>;

// TODO: add types for local keys
const tabStatusLocalKey: Record<ConnectionStatus, string> = {
  [ConnectionStatus.Closed]: 'common:connection-status-closed',
  [ConnectionStatus.Open]: 'common:connection-status-open',
  [ConnectionStatus.Connected]: 'common:connection-status-connected',
  [ConnectionStatus.Error]: 'common:connection-status-error',
};

export const TabStatus: FC<TabStatusProps> = ({status}) => {
  const {t} = useTranslation();

  const statusTextClassName = classNames(s.statusText, {
    [s.closed]: status === ConnectionStatus.Closed,
    [s.open]: status === ConnectionStatus.Open,
    [s.connected]: status === ConnectionStatus.Connected,
    [s.error]: status === ConnectionStatus.Error,
  })

  return (
    <>
      <Typography use="subtitle1">{t('common:connection-status')}: </Typography>
      <Typography className={statusTextClassName} use="headline6">{t(tabStatusLocalKey[status])}</Typography>
    </>
  );
};
