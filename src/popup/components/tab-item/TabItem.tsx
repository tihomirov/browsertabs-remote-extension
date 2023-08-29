import classNames from 'classnames';
import React, {FC} from 'react';
import browser from 'webextension-polyfill';
import {observer} from 'mobx-react-lite';
import {computed} from 'mobx'

import {isSomething} from '../../../common/utils';
import {ConnectionStatus} from '../../../common/types';
import {TabItemButton} from './TabItemButton';

import * as s from './styles.module.scss';
import {useStores} from '../../hooks';

type TabItemProps = Readonly<{
	tab: browser.Tabs.Tab;
}>;

export const TabItem: FC<TabItemProps> = observer(({tab}) => {
  const {tabsStore} = useStores();
  const tabsStatus = computed(() => 
    isSomething(tab.id) 
      ? tabsStore.getTabsStatus(tab.id) 
      : undefined
  ).get();

  const statusClassNames = classNames(s.status, {
    [s.connected]: tabsStatus?.connection === ConnectionStatus.Connected,
    [s.open]: tabsStatus?.connection === ConnectionStatus.Open,
    [s.error]: tabsStatus?.connection === ConnectionStatus.Error,
  });

  return (
    <div className={s.tab}>
      <span className={statusClassNames}>●</span>
      <span className={s.title}>{tab.title}</span>
      {isSomething(tab.id) && (
        <TabItemButton
          tabId={tab.id}
          connected={tabsStatus?.connection === ConnectionStatus.Connected}
          error={tabsStatus?.connection === ConnectionStatus.Error}
        />
      )}
    </div>
  );
});
