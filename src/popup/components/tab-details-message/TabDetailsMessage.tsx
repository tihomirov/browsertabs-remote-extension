import {Icon} from '@rmwc/icon';
import {Typography} from '@rmwc/typography';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {ConnectionStatusType} from '../../../common/types';
import s from './styles.module.scss';

type TabStatusProps = Readonly<{
  status: ConnectionStatusType;
  error?: string;
}>;

const statusIcon: Record<ConnectionStatusType, string | undefined> = {
  [ConnectionStatusType.Error]: 'error',
  [ConnectionStatusType.Connected]: 'link',
  [ConnectionStatusType.Closed]: 'portable_wifi_off',
  [ConnectionStatusType.Open]: undefined,
};

const statusMessages: Record<ConnectionStatusType, string | undefined> = {
  [ConnectionStatusType.Error]: 'common:connection-details-message-error',
  [ConnectionStatusType.Connected]: 'common:connection-details-message-connected',
  [ConnectionStatusType.Closed]: 'common:connection-details-message-closed',
  [ConnectionStatusType.Open]:  undefined,
};

const defaultErrorMessage = 'Unknown';

export const TabDetailsMessage: FC<TabStatusProps> = ({status, error}) => {
  const {t} = useTranslation();

  if (status === ConnectionStatusType.Open) {
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
