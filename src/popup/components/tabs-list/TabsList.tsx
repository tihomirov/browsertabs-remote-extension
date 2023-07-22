import {observer} from 'mobx-react-lite';
import React, {FC, useCallback} from 'react';

import {useStores} from '../../hooks';

export const TabsList: FC = observer(() => {
	const {tabsStore} = useStores();

	if (!tabsStore.tabs) {
		return null;
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
