import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {useStores} from '../../hooks';
import {Loader} from '../loader';

export const TabsList: FC = observer(() => {
	const {t} = useTranslation();
	const {tabsStore} = useStores();

	if (tabsStore.loading) {
		return <Loader/>;
	}

	if (!tabsStore.tabs?.length) {
		return <div>{t('common:no-tabs-to-connect')}</div>;
	}

	return (
		<ul>
			{tabsStore.tabs.map(tab =>
				<li>
					<div>{tab.title}</div>
				</li>)}
		</ul>
	);
});
