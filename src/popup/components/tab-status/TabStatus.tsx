import {ListItemGraphic} from '@rmwc/list';
import {Typography} from '@rmwc/typography';
import classNames from 'classnames';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {ConnectionStatus} from '../../../common/types';
import s from './styles.module.scss';

type TabStatusProps = Readonly<{
  status: ConnectionStatus;
  listIcon?: boolean;
}>;

// TODO: add types for local keys
const tabStatusLocalKey: Record<ConnectionStatus, string> = {
  [ConnectionStatus.Closed]: 'common:connection-status-closed',
  [ConnectionStatus.Open]: 'common:connection-status-open',
  [ConnectionStatus.Connected]: 'common:connection-status-connected',
  [ConnectionStatus.Error]: 'common:connection-status-error',
};

export const TabStatus: FC<TabStatusProps> = ({status, listIcon = false}) => {
  const {t} = useTranslation();

  const statusClassName = classNames(s.status, {
    [s.closed]: status === ConnectionStatus.Closed,
    [s.open]: status === ConnectionStatus.Open,
    [s.connected]: status === ConnectionStatus.Connected,
    [s.error]: status === ConnectionStatus.Error,
    [s.text]: !listIcon,
  });

  if (listIcon) {
    return <ListItemGraphic className={statusClassName} icon='workspaces' />;
  }

  return (
    <>
      <Typography use="subtitle1">{t('common:connection-status')}: </Typography>
      <Typography className={statusClassName} use="headline6">{t(tabStatusLocalKey[status])}</Typography>
    </>
  );
};
