import React, {FC, useCallback} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import * as s from './styles.module.scss';
import {useStores} from '../../hooks';

type TabItemButtonProps = Readonly<{
	tabId: number;
	connected: boolean;
	error: boolean;
}>;

export const TabItemButton: FC<TabItemButtonProps> = ({tabId, connected, error}) => {
  const {t} = useTranslation();
  const {tabsStore} = useStores();

  const onDisconnect = useCallback(async () => {
    const connectionError = await tabsStore.closeConnection(Number(tabId));

    if (connectionError) {
      console.error(connectionError);
    }
  }, [tabsStore, tabId])

  if (error) {
    return <button className={s.button}>{t('common:tab-button-reconnect')}</button>;
  }

  if (connected) {
    return <button className={s.button} onClick={onDisconnect}>{t('common:tab-button-disconnect')}</button>;
  }

  return (
    <Link className={s.button} to={`/connect-tab/${tabId}`}>{t('common:tab-button-connect')}</Link>
  );
};
