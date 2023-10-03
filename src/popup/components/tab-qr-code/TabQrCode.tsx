import {Icon} from '@rmwc/icon';
import {IconButton} from '@rmwc/icon-button';
import {Tooltip} from '@rmwc/tooltip';
import {Typography} from '@rmwc/typography';
import {toDataURL} from 'qrcode';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {Loader} from '../loader';
import s from './styles.module.scss';

type TabQrCodeProps = Readonly<{
  peerId: string | undefined;
}>;

export const TabQrCode: FC<TabQrCodeProps> = ({peerId}) => {
  const {t} = useTranslation();
  const [qrDataUrl, setQrDataUrl] = useState<string | undefined>();
  const [tooltipContent, setTooltipContent] = useState<string>(t('common:copy-to-clipboard'));
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    if (peerId) {
      toDataURL(peerId, {margin: 1})
        .then(qr => setQrDataUrl(qr))
        .catch(() => setErrorMessage(t('common:connect-tab-qr-error')));
    }
  }, [peerId]);

  const copyPeerId = useCallback(() => {
    if (!peerId) {
      return;
    }
    navigator.clipboard.writeText(peerId);
    setTooltipContent(t('common:copy-to-clipboard-success'));
  }, [peerId, t]);

  const resetTooltipContent = useCallback(() => {
    setTooltipContent(t('common:copy-to-clipboard'));
  }, [t]);

  return (
    <div className={s.container}>
      <Typography use="subtitle2">{t('common:connect-tab-qr-tutorial')}</Typography>
      {errorMessage && <Typography use="caption">{errorMessage}</Typography>}
      <div className={s.imageContainer}>
        {qrDataUrl ? <img className={s.image} src={qrDataUrl} /> : <Loader size="xlarge"/>}
      </div>
      <div className={s.peerId}>
        {peerId && <>
          <Tooltip content={t('common:connection-peer-id-tutorial')}>
            <Icon icon="info" />
          </Tooltip>
          <Typography use="body1">{peerId}</Typography>
          <Tooltip content={tooltipContent}>
            <IconButton
              onClick={copyPeerId}
              onMouseLeave={resetTooltipContent}
              icon="content_copy"
            />
          </Tooltip>
        </>}
      </div>
    </div>
  );
};
