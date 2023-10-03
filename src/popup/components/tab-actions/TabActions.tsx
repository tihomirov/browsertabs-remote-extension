import {Button} from '@rmwc/button';
import React, {FC, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import {ConnectionStatus} from '../../../common/types';
import {useStores} from '../../hooks';
import s from './styles.module.scss';

type TabActionsProps = Readonly<{
  status: ConnectionStatus;
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

  if (status === ConnectionStatus.Open || status === ConnectionStatus.Connected) {
    return (
      <Button
        className={s.button}
        onClick={closeConnection}
        label={t('common:connection-button-close')}
      />
    );
  }

  if (status === ConnectionStatus.Error) {
    return (
      <Button
        className={s.button}
        onClick={restartConnection}
        label={t('common:connection-button-error')}
      />
    );
  }

  if (status === ConnectionStatus.Closed) {
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
