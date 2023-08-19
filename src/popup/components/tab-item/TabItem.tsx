import classNames from 'classnames';
import React, {FC, useState} from 'react';
import browser from 'webextension-polyfill';

import {TabItemButton} from './TabItemButton';

import * as s from './styles.module.scss';

type TabItemProps = Readonly<{
	tab: browser.Tabs.Tab;
}>;

export const TabItem: FC<TabItemProps> = ({tab}) => {
	const [connected] = useState(false);
	const [error] = useState(false);

	const statusClassNames = classNames(s.status, {
		[s.connected]: connected,
		[s.error]: error,
	});

	return (
		<div className={s.tab}>
			<span className={statusClassNames}>●</span>
			<span className={s.title}>{tab.title}</span>
			<TabItemButton tabId={tab.id} connected={connected} error={error} />
		</div>
	);
};
