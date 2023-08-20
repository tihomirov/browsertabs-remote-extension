import React, {FC, useEffect, useState} from 'react';
// import {Peer} from 'peerjs';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {toDataURL} from 'qrcode';
import browser from 'webextension-polyfill';

import {StartConnectionTabMessage, TabMessageType, TabMessageResponse} from '../../../common/types';
import {Response, ResponseFactory, tabMessageTypeguard} from '../../../common/utils';

import * as s from './styles.module.scss';

// let inited = false
type StartConnectionResponse = TabMessageResponse[TabMessageType.StartConnection];
const startConnectionMessage: StartConnectionTabMessage = {
	type: TabMessageType.StartConnection,
}

export const ConnectTab: FC = () => {
	const {t} = useTranslation();
	const {tabId} = useParams();
	const [peerId, setPeerId] = useState<string | undefined>();
	const [qrDataUrl, setQrDataUrl] = useState<string | undefined>();
	const [qrError, setQrError] = useState<string | undefined>();

	useEffect(() => {
		const sendStartConnection = async () => {
			const response: Response<StartConnectionResponse> = await browser.tabs.sendMessage(Number(tabId), startConnectionMessage);

			console.log('response !!!', response)

			if (ResponseFactory.isFail(response)) {
				console.error(response.data.message)
				setQrError(t('common:connect-tab-peer-id-error'))
				return;
			}

			if (!response.data.peerId) {
				return;
			}

			console.log('onMessage !!!')
			browser.runtime.onMessage.addListener((message) => {
				console.log('!!! onMessage', message);
				if (!tabMessageTypeguard(message)) {
					// message is external. Do not need to handle
					return;
				}

				if (message.type === TabMessageType.ConnectionOpen) {
					// close QR code and redirect to all pages
				}
			});
			
			setPeerId(response.data.peerId);
			toDataURL(response.data.peerId)
			.then(data => setQrDataUrl(data))
			.catch(() => setQrError(t('common:connect-tab-qr-error')));
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
