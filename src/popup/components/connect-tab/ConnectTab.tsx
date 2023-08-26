import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {toDataURL} from 'qrcode';
import {observer} from 'mobx-react-lite';
import {computed} from 'mobx'

import {isSomething} from '../../../common/utils';
import {useStores} from '../../hooks';

import * as s from './styles.module.scss';
import {ConnectionStatus} from '../../../common/types';

export const ConnectTab: FC = observer(() => {
	const {t} = useTranslation();
	const {tabId} = useParams();
	const {tabsStore} = useStores();
	const [peerId, setPeerId] = useState<string | undefined>();
	const [qrDataUrl, setQrDataUrl] = useState<string | undefined>();
	const [qrError, setQrError] = useState<string | undefined>();
	const [connected, setConnected] = useState<boolean>(false);
	const tabsStatus = computed(() => isSomething(tabId) 
		? tabsStore.getTabsStatus(Number(tabId)) 
		: undefined
).get();

	useEffect(() => {
		const sendStartConnection = async () => {
			const error = await tabsStore.startConnection(Number(tabId));

			if (error) {
				console.error(error)
				setQrError(t('common:connect-tab-peer-id-error'))
			}
		}

		void sendStartConnection();
	}, []);

	useEffect(() => {
		setConnected(tabsStatus?.connection === ConnectionStatus.Connected);

		if (tabsStatus?.connection === ConnectionStatus.Open && tabsStatus.peerId) {
			setPeerId(tabsStatus.peerId);
			toDataURL(tabsStatus.peerId)
				.then(qr => setQrDataUrl(qr))
				.catch(() => setQrError(t('common:connect-tab-qr-error')));
		}
	}, [tabsStatus?.connection])

	return (
		<div className={s.container}>
			<span className={s.tutorial}>{t('common:connect-tab-qr-tutorial')}</span>
			{connected && <span>OK!!!!!!!!!</span>}
			{peerId && <span className={s.tutorial}>{peerId}</span>}
			{qrError && <span className={s.error}>{qrError}</span>}
			{qrDataUrl && <img src={qrDataUrl} />}
		</div>
	);
});
