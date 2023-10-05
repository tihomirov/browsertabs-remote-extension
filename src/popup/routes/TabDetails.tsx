import {Grid, GridCell} from '@rmwc/grid';
import {observer} from 'mobx-react-lite';
import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {ConnectionStatus} from '../../common/types';
import {Loader} from '../components/loader';
import {TabActions} from '../components/tab-actions';
import {TabDetailsMessage} from '../components/tab-details-message';
import {TabQrCode} from '../components/tab-qr-code';
import {TabStatus} from '../components/tab-status';
import {useStores} from '../hooks';

export const TabDetails: FC = observer(() => {
  const {tabsStore, settingsStore} = useStores();
  const {tabId} = useParams();
  const tab = tabsStore.currentTab;

  useEffect(() => {
    if (tabId) {
      tabsStore.setCurrentTabId(Number(tabId));
    }

    return () => tabsStore.clearCurrentTab();
  }, [tabId]);

  useEffect(() => {
    if (tab && settingsStore.autoStartConnection && tab.status === ConnectionStatus.Closed) {
      tabsStore.startConnection(tab.tab.id);
    }
  }, [tab?.tab.id]);

  if (!tab) {
    return <Loader size="xlarge" />;
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
        {tab.status === ConnectionStatus.Open
          ? <TabQrCode peerId={tab.peerId} />
          : <TabDetailsMessage status={tab.status} error={tab.error} />
        }
      </GridCell>
    </Grid>
  );
});
