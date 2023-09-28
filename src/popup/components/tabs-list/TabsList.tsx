import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {List} from '@rmwc/list';

import {useStores} from '../../hooks';
import {Loader} from '../loader';
import {TabItem} from '../tab-item';

export const TabsList: FC = observer(() => {
  const {t} = useTranslation();
  const {tabsStore} = useStores();

  if (tabsStore.loading) {
    return <Loader size="xlarge"/>;
  }

  if (!tabsStore.tabs?.length) {
    return <div>{t('common:no-tabs-to-connect')}</div>;
  }

  return (
    <List>
      {tabsStore.tabs.map(tab => <TabItem key={tab.id} tab={tab} />)}
    </List>
  );
});
