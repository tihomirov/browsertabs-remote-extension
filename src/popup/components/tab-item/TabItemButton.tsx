import classNames from 'classnames';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import browser from 'webextension-polyfill';

import s from './styles.module.scss';

type TabItemButtonProps = Readonly<{
	connected: boolean;
	error: boolean;
}>;

export const TabItemButton: FC<TabItemButtonProps> = ({connected, error}) => {
	const {t} = useTranslation();

	if (error) {
		return <button className={s.button}>{t('common:tab-button-reconnect')}</button>;
	}

	if (connected) {
		return <button className={s.button}>{t('common:tab-button-disconnect')}</button>;
	}

	return (
		<button className={s.button}>{t('common:tab-button-connect')}</button>
	);
};
