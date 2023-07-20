import {observer} from 'mobx-react-lite';
import React, {FC, useCallback} from 'react';

import {useStores} from '../../hooks';

export const TabsList: FC = observer(() => {
	const {tabsStore} = useStores();

	return (
		<div>
      Tabs List
		</div>
	);
});
