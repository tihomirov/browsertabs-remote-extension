import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {Grid, GridCell} from '@rmwc/grid';

import {ConnectionStatus} from '../../common/types';
import {TabStatus} from '../components/tab-status';
import {TabQrCode} from '../components/tab-qr-code';
import {TabActions} from '../components/tab-actions';
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

  useEffect(() => {
    if (tab && tab.status === ConnectionStatus.Closed) {
      tabsStore.startConnection(tab.tab.id);
    }
  }, [tab?.tab.id])

  if (!tab) {
    return <Loader size="xlarge" />
  }

  return (
    <Grid>
      <GridCell span={2}>
        <TabStatus status={tab.status} />
      </GridCell>
      <GridCell span={2} >
        <TabActions tabId={tab.tab.id} status={tab.status} />
      </GridCell>
      <GridCell span={4}>
        <TabQrCode peerId={tab.peerId} />
      </GridCell>
    </Grid>
  )
});
