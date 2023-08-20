import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {toDataURL} from 'qrcode';

import {useStores} from '../../hooks';
import * as s from './styles.module.scss';

export const ConnectTab: FC = () => {
	const {t} = useTranslation();
	const {tabId} = useParams();
	const {tabsStore} = useStores();
	const [peerId, setPeerId] = useState<string | undefined>();
	const [qrDataUrl, setQrDataUrl] = useState<string | undefined>();
	const [qrError, setQrError] = useState<string | undefined>();

	useEffect(() => {
		const sendStartConnection = async () => {
			const [data, error] = await tabsStore.startConnection(Number(tabId));

			if (error) {
				console.error(error)
				setQrError(t('common:connect-tab-peer-id-error'))
				return;
			}

			if (data?.peerId) {
				const peerId = data?.peerId;

				setPeerId(peerId);
				toDataURL(peerId)
					.then(qr => setQrDataUrl(qr))
					.catch(() => setQrError(t('common:connect-tab-qr-error')));
			}
		}

		void sendStartConnection();
	}, []);

	return (
		<div className={s.container}>
			<span className={s.tutorial}>{t('common:connect-tab-qr-tutorial')}</span>
			{peerId && <span className={s.tutorial}>{peerId}</span>}
			{qrError && <span className={s.error}>{qrError}</span>}
			{qrDataUrl && <img src={qrDataUrl} />}
		</div>
	);
};
