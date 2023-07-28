import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import QRCode from 'qrcode';

import s from './styles.module.scss';

export const ConnectTab: FC = () => {
	const {t} = useTranslation();
	const {tabId} = useParams();
	const [qrDataUrl, setQrDataUrl] = useState<string | undefined>();
	const [qrError, setQrError] = useState<string | undefined>();

	console.log(tabId);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		QRCode.toDataURL(tabId.toString())
			.then(data => {
				setQrDataUrl(data);
			})
			.catch(() => {
				setQrError(t('common:connect-tab-qr-error'));
			});
	}, []);

	return (
		<div className={s.container}>
			<span className={s.tutorial}>{t('common:connect-tab-qr-tutorial')}</span>
			{qrError && <span className={s.error}>{qrError}</span>}
			{qrDataUrl && <img src={qrDataUrl} />}
		</div>
	);
};
