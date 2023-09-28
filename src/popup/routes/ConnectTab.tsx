import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {ConnectTab as ConnectTabComponent} from '../components/connect-tab';
import {useStores} from '../hooks';

export const ConnectTab: FC = () => {
  const {tabsStore} = useStores();
  const {tabId} = useParams();

  useEffect(() => {
    if (tabId) {
      tabsStore.setCurrentTabId(Number(tabId));
    }

    return () => tabsStore.clearCurrentTab();
  }, [tabId])

  return (
    <ConnectTabComponent/>
  )
};
