import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {useStores} from '../../hooks';
import {Loader} from '../loader';
import {TabItem} from '../tab-item';

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
    <>
      {tabsStore.tabs.map(tab => <TabItem key={tab.id} tab={tab} />)}
    </>
  );
});
