import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import {ConnectTab} from '../components/connect-tab';
import {useStores} from '../hooks';
import {Loader} from '../components/loader';

export const TabDetails: FC = observer(() => {
  const {tabsStore} = useStores();
  const {tabId} = useParams();
  const tab = tabsStore.currentTab;

  useEffect(() => {
    if (tabId) {
      tabsStore.setCurrentTabId(Number(tabId));
    }

    return () => tabsStore.clearCurrentTab();
  }, [tabId])

  if (!tab) {
    return <Loader size="xlarge" />
  }

  return (
    <ConnectTab 
      tabId={tab.tab.id}
      status={tab.status}
      peerId={tab.peerId}
      error={tab.error}
    />
  )
});
