import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import s from './styles.module.scss';

type TabItemButtonProps = Readonly<{
	tabId: number;
	connected: boolean;
	error: boolean;
}>;

export const TabItemButton: FC<TabItemButtonProps> = ({tabId, connected, error}) => {
	const {t} = useTranslation();

	if (error) {
		return <button className={s.button}>{t('common:tab-button-reconnect')}</button>;
	}

	if (connected) {
		return <button className={s.button}>{t('common:tab-button-disconnect')}</button>;
	}

	return (
		<Link className={s.button} to={`/connect-tab/${tabId}`}>{t('common:tab-button-connect')}</Link>
	);
};
