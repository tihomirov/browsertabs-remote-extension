import classNames from 'classnames';
import React, {FC} from 'react';
import browser from 'webextension-polyfill';
import {observer} from 'mobx-react-lite';
import {computed} from 'mobx'

import {isSomething} from '../../../common/utils';
import {TabItemButton} from './TabItemButton';

import * as s from './styles.module.scss';
import {useStores} from '../../hooks';

type TabItemProps = Readonly<{
	tab: browser.Tabs.Tab;
}>;

export const TabItem: FC<TabItemProps> = observer(({tab}) => {
	const {tabsStore} = useStores();
	const [connected, error] = computed(() => 
		isSomething(tab.id) 
			? tabsStore.getTabsConnectionStatus(tab.id) 
			: [false, undefined]
	).get();

	const statusClassNames = classNames(s.status, {
		[s.connected]: connected,
		[s.error]: error,
	});

	return (
		<div className={s.tab}>
			<span className={statusClassNames}>●</span>
			<span className={s.title}>{tab.title}</span>
			{isSomething(tab.id) && (
				<TabItemButton tabId={tab.id} connected={!!connected} error={!!error} />
			)}
		</div>
	);
});
