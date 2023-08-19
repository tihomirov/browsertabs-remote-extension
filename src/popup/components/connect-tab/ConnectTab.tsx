import React, {FC, useEffect, useState} from 'react';
// import {Peer} from 'peerjs';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {toDataURL} from 'qrcode';
import browser from 'webextension-polyfill';

import {StartConnectionTabMessage, TabMessageType, TabMessageResponse} from '../../../common/types';
import {Response, ResponseFactory} from '../../../common/utils';

import * as s from './styles.module.scss';

// let inited = false
type StartConnectionResponse = TabMessageResponse[TabMessageType.StartConnection];
const startConnectionMessage: StartConnectionTabMessage = {
	type: TabMessageType.StartConnection,
}

export const ConnectTab: FC = () => {
	const {t} = useTranslation();
	const {tabId} = useParams();
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

			toDataURL(response.data.peerId)
			.then(data => setQrDataUrl(data))
			.catch(() => setQrError(t('common:connect-tab-qr-error')));
		}

		void sendStartConnection();

		// if (!inited) {
    //   const peer = new Peer('0296b895-b0a8-96a9-cae1-fcc0ced0119C');   
		// 	console.log('new Peer .', peer.id);   

		// 	setTimeout(() => {
		// 		const conn = peer.connect('0296b895-b0a8-96a9-cae1-fcc0ced0119R');

		// 		conn.on('open', () => {
		// 			console.log('Peer!!! open');
	
		// 			let count = 0;
		// 			setInterval(() => {
		// 				console.log('hi.', count);          
		// 				conn.send('hi - ' + count);
		// 				count++;
		// 			}, 1000)
		// 		});
		// 	}, 2000)

		// 	inited = true;
		// }
	}, []);

	return (
		<div className={s.container}>
			<span className={s.tutorial}>{t('common:connect-tab-qr-tutorial')}</span>
			{qrError && <span className={s.error}>{qrError}</span>}
			{qrDataUrl && <img src={qrDataUrl} />}
		</div>
	);
};
