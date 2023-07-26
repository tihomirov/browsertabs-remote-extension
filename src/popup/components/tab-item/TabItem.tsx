import classNames from 'classnames';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import browser from 'webextension-polyfill';

import s from './styles.module.scss';

type TabItemProps = Readonly<{
	tab: browser.Tabs.Tab;
}>;

export const TabItem: FC<TabItemProps> = ({tab}) => {
	const {t} = useTranslation();

	const random = Math.random();
	const connected = random > 0.4 && random < 0.8;
	const error = random > 0.8;

	const statusClassNames = classNames(s.status, {
		[s.connected]: connected,
		[s.error]: error,
	});

	return (
		<div key={tab.id} className={s.tab}>
			<span className={statusClassNames}>●</span>
			<span className={s.title}>{tab.title}</span>
			<div className={s.button}>{t('common:connect-tab-button')}</div>
		</div>
	);
};
