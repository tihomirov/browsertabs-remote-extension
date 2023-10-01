// import React, {FC, useCallback, useEffect, useState} from 'react';
// import {useTranslation} from 'react-i18next';
// import {toDataURL} from 'qrcode';

// import {ConnectionStatus} from '../../../common/types';
// import {useStores} from '../../hooks';

// import {ConnectTabError} from './ConnectTabError';
// import * as s from './styles.module.scss';

// type ConnectTabProps = Readonly<{
//   tabId: number;
//   status: ConnectionStatus;
//   peerId?: string; 
//   error?: string
// }>;

// export const ConnectTab: FC<ConnectTabProps> = ({tabId, status, peerId}) => {
//   const {t} = useTranslation();
//   const {tabsStore} = useStores();
//   const [qrDataUrl, setQrDataUrl] = useState<string | undefined>();
//   const [errorMessage, setErrorMessage] = useState<string | undefined>();

//   const sendStartConnection = useCallback(async () => {
//     await tabsStore.startConnection(tabId);
//   }, [tabsStore, tabId])

//   const onReloadTabClick = useCallback(async () => {
//     await tabsStore.reloadTab(tabId);
//     await sendStartConnection();
//   }, [sendStartConnection, tabsStore, tabId])

//   useEffect(() => {
//     const startConnection = () => sendStartConnection();

//     if (status === ConnectionStatus.Closed) {
//       startConnection();
//     }
//   }, []);

//   useEffect(() => {
//     if (peerId) {
//       toDataURL(peerId)
//         .then(qr => setQrDataUrl(qr))
//         .catch(() => setErrorMessage(t('common:connect-tab-qr-error')));
//     }
//   }, [peerId]);

//   return (
//     <div className={s.container}>
//       <span className={s.tutorial}>{t('common:connect-tab-qr-tutorial')}</span>
//       {status === ConnectionStatus.Connected && <span>OK!!!!!!!!!</span>}
//       {peerId && <span className={s.tutorial}>{peerId}</span>}
//       <ConnectTabError
//         message={errorMessage}
//         onReloadTabClick={onReloadTabClick}
//         reloadTabButton={false}
//         // reloadTabButton={reloadTabButton}
//       />
//       {qrDataUrl && <img src={qrDataUrl} />}
//     </div>
//   );
// };
