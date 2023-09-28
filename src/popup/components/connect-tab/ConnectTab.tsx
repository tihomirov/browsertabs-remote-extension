import React, {FC, useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {toDataURL} from 'qrcode';

import {ConnectionStatus} from '../../../common/types';
import {useStores} from '../../hooks';
import {Tab} from '../../stores/tabs-store';

import {ConnectTabError} from './ConnectTabError';
import * as s from './styles.module.scss';

type ConnectTabProps = Readonly<{
  tab: Readonly<Tab>;
}>;

export const ConnectTab: FC<ConnectTabProps> = ({tab}) => {
  const {t} = useTranslation();
  const {tabsStore} = useStores();
  const [qrDataUrl, setQrDataUrl] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const sendStartConnection = useCallback(async () => {
    await tabsStore.startConnection(tab.tab.id);
  }, [tabsStore, tab])

  const onReloadTabClick = useCallback(async () => {
    await tabsStore.reloadTab(tab.tab.id);
    await sendStartConnection();
  }, [sendStartConnection, tabsStore, tab])

  useEffect(() => {
    const startConnection = () => sendStartConnection();

    if (tab.status === ConnectionStatus.Closed) {
      startConnection();
    }
  }, []);

  useEffect(() => {
    if (tab.peerId) {
      toDataURL(tab.peerId)
        .then(qr => setQrDataUrl(qr))
        .catch(() => setErrorMessage(t('common:connect-tab-qr-error')));
    }
  }, [tab.peerId]);

  return (
    <div className={s.container}>
      <span className={s.tutorial}>{t('common:connect-tab-qr-tutorial')}</span>
      {tab.status === ConnectionStatus.Connected && <span>OK!!!!!!!!!</span>}
      {tab.peerId && <span className={s.tutorial}>{tab.peerId}</span>}
      <ConnectTabError
        message={errorMessage}
        onReloadTabClick={onReloadTabClick}
        reloadTabButton={false}
        // reloadTabButton={reloadTabButton}
      />
      {qrDataUrl && <img src={qrDataUrl} />}
    </div>
  );
};
