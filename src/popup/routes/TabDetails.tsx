import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {Grid, GridRow, GridCell} from '@rmwc/grid';

import {ConnectTab} from '../components/connect-tab';
import {TabStatus} from '../components/tab-status';
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
    <Grid>
      <GridRow>
        <GridCell span={12}>
          <TabStatus status={tab.status} />
        </GridCell>
      </GridRow>
      <ConnectTab 
        tabId={tab.tab.id}
        status={tab.status}
        peerId={tab.peerId}
        error={tab.error}
      />
    </Grid>
  )
});
