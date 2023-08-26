import React, {FC, useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {toDataURL} from 'qrcode';
import {observer} from 'mobx-react-lite';
import {computed} from 'mobx'

import {isSomething} from '../../../common/utils';
import {ConnectionStatus} from '../../../common/types';
import {useStores} from '../../hooks';

import {ConnectTabError} from './ConnectTabError';
import * as s from './styles.module.scss';

export const ConnectTab: FC = observer(() => {
	const {t} = useTranslation();
	const {tabId} = useParams();
	const {tabsStore} = useStores();
	const [qrDataUrl, setQrDataUrl] = useState<string | undefined>();
	const [errorMessage, setErrorMessage] = useState<string | undefined>();
	const [reloadTabButton, setReloadTabButton] = useState<boolean>(false);
	const tabsStatus = computed(() => isSomething(tabId) 
		? tabsStore.getTabsStatus(Number(tabId)) 
		: undefined
).get();

const sendStartConnection = useCallback(async () => {
	const connectionError = await tabsStore.startConnection(Number(tabId));

	if (connectionError) {
		console.error(connectionError);
		setErrorMessage(t('common:connect-tab-peer-id-error'));
		setReloadTabButton(true);
		return;
	} else {
		setErrorMessage(undefined);
		setReloadTabButton(false);
	}
}, [tabsStore, tabId])

const onReloadTabClick = useCallback(async () => {
	await tabsStore.reloadTab(Number(tabId));
	await sendStartConnection();
}, [sendStartConnection])

	useEffect(() => {
		const startConnection = () => sendStartConnection();
		void startConnection();
	}, []);

	useEffect(() => {
		if (tabsStatus?.connection === ConnectionStatus.Open && tabsStatus.peerId) {
			toDataURL(tabsStatus.peerId)
				.then(qr => setQrDataUrl(qr))
				.catch(() => setErrorMessage(t('common:connect-tab-qr-error')));
		}
	}, [tabsStatus]);

	return (
		<div className={s.container}>
			<span className={s.tutorial}>{t('common:connect-tab-qr-tutorial')}</span>
			{tabsStatus?.connection === ConnectionStatus.Connected && <span>OK!!!!!!!!!</span>}
			{tabsStatus?.peerId && <span className={s.tutorial}>{tabsStatus.peerId}</span>}
			<ConnectTabError
				message={errorMessage}
				reloadTabButton={reloadTabButton}
				onReloadTabClick={onReloadTabClick}
			/>
			{qrDataUrl && <img src={qrDataUrl} />}
		</div>
	);
});
