import {ListItemGraphic} from '@rmwc/list';
import {Typography} from '@rmwc/typography';
import classNames from 'classnames';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {ConnectionStatusType} from '../../../common/types';
import s from './styles.module.scss';

type TabStatusProps = Readonly<{
  status: ConnectionStatusType;
  listIcon?: boolean;
}>;

// TODO: add types for local keys
const tabStatusLocalKey: Record<ConnectionStatusType, string> = {
  [ConnectionStatusType.Closed]: 'common:connection-status-closed',
  [ConnectionStatusType.Open]: 'common:connection-status-open',
  [ConnectionStatusType.Connected]: 'common:connection-status-connected',
  [ConnectionStatusType.Error]: 'common:connection-status-error',
};

export const TabStatus: FC<TabStatusProps> = ({status, listIcon = false}) => {
  const {t} = useTranslation();

  const statusClassName = classNames(s.status, {
    [s.closed]: status === ConnectionStatusType.Closed,
    [s.open]: status === ConnectionStatusType.Open,
    [s.connected]: status === ConnectionStatusType.Connected,
    [s.error]: status === ConnectionStatusType.Error,
    [s.text]: !listIcon,
  });

  if (listIcon) {
    return <ListItemGraphic className={statusClassName} icon='workspaces' />;
  }

  return (
    <>
      <Typography use="subtitle1">{t('common:connection-status')}: </Typography>
      <Typography className={statusClassName} use="headline6">
        {t(tabStatusLocalKey[status])}
      </Typography>
    </>
  );
};
