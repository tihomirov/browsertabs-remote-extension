import {Button} from '@rmwc/button';
import React, {FC, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import {ConnectionStatusType} from '../../../common/types';
import {useStores} from '../../hooks';
import s from './styles.module.scss';

type TabActionsProps = Readonly<{
  status: ConnectionStatusType;
  tabId: number;
}>;

export const TabActions: FC<TabActionsProps> = ({status, tabId}) => {
  const {t} = useTranslation();
  const {tabsStore} = useStores();

  const closeConnection = useCallback(() => {
    tabsStore.closeConnection(tabId);
  }, [tabsStore, tabId]);

  const restartConnection = useCallback(() => {
    tabsStore.restartConnection(tabId);
  }, [tabsStore, tabId]);

  const startConnection = useCallback(() => {
    tabsStore.startConnection(tabId);
  }, [tabsStore, tabId]);

  if (status === ConnectionStatusType.Open || status === ConnectionStatusType.Connected) {
    return (
      <Button
        className={s.button}
        onClick={closeConnection}
        label={t('common:connection-button-close')}
      />
    );
  }

  if (status === ConnectionStatusType.Error) {
    return (
      <Button
        className={s.button}
        onClick={restartConnection}
        label={t('common:connection-button-error')}
      />
    );
  }

  if (status === ConnectionStatusType.Closed) {
    return (
      <Button
        className={s.button}
        onClick={startConnection}
        label={t('common:connection-button-open')}
      />
    );
  }

  return null;
};
