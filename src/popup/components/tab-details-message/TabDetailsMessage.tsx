import {Icon} from '@rmwc/icon';
import {Typography} from '@rmwc/typography';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {ConnectionStatus} from '../../../common/types';
import s from './styles.module.scss';

type TabStatusProps = Readonly<{
  status: ConnectionStatus;
  error?: string;
}>;

const statusIcon: Record<ConnectionStatus, string | undefined> = {
  [ConnectionStatus.Error]: 'error',
  [ConnectionStatus.Connected]: 'link',
  [ConnectionStatus.Closed]: 'portable_wifi_off',
  [ConnectionStatus.Open]: undefined,
};

const statusMessages: Record<ConnectionStatus, string | undefined> = {
  [ConnectionStatus.Error]: 'common:connection-details-message-error',
  [ConnectionStatus.Connected]: 'common:connection-details-message-connected',
  [ConnectionStatus.Closed]: 'common:connection-details-message-closed',
  [ConnectionStatus.Open]:  undefined,
};

const defaultErrorMessage = 'Unknown';

export const TabDetailsMessage: FC<TabStatusProps> = ({status, error}) => {
  const {t} = useTranslation();

  if (status === ConnectionStatus.Open) {
    return null;
  }

  return (
    <div className={s.container}>
      <Icon className={s.icon} icon={{icon: statusIcon[status], size: 'xlarge'}} />
      <Typography use="body1">
        {t(statusMessages[status], {error: error ?? defaultErrorMessage})}
      </Typography>
    </div>
  );
};
