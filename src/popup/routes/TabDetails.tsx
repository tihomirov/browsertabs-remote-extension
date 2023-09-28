import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import {ConnectTab} from '../components/connect-tab';
import {useStores} from '../hooks';
import {Loader} from '../components/loader';

export const TabDetails: FC = observer(() => {
  const {tabsStore} = useStores();
  const {tabId} = useParams();

  useEffect(() => {
    if (tabId) {
      tabsStore.setCurrentTabId(Number(tabId));
    }

    return () => tabsStore.clearCurrentTab();
  }, [tabId])

  if (!tabsStore.currentTab) {
    return <Loader size="xlarge" />
  }

  return (
    <ConnectTab tab={tabsStore.currentTab}/>
  )
});
