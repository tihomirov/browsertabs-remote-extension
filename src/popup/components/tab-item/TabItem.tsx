import classNames from 'classnames';
import React, {FC, useCallback} from 'react';
import browser from 'webextension-polyfill';
import {observer} from 'mobx-react-lite';
import {computed} from 'mobx'
import {ListItem, ListItemGraphic, ListItemText, ListItemMeta} from '@rmwc/list';
import {Tooltip} from '@rmwc/tooltip';

import {isSomething} from '../../../common/utils';
import {ConnectionStatus} from '../../../common/types';

import * as s from './styles.module.scss';
import {useStores} from '../../hooks';
import {useNavigate} from 'react-router-dom';

type TabItemProps = Readonly<{
	tab: browser.Tabs.Tab;
}>;

export const TabItem: FC<TabItemProps> = observer(({tab}) => {
  const navigate = useNavigate();
  const {tabsStore} = useStores();
  const tabsStatus = computed(() => 
    isSomething(tab.id) 
      ? tabsStore.getTabsStatus(tab.id) 
      : undefined
  ).get();

  const onClick = useCallback(() => {
    navigate(`/connect-tab/${tab.id}`)
  }, [tab])

  const statusClassNames = classNames(s.statusIcon, {
    [s.closed]: tabsStatus?.connection === ConnectionStatus.Closed,
    [s.connected]: tabsStatus?.connection === ConnectionStatus.Connected,
    [s.open]: tabsStatus?.connection === ConnectionStatus.Open,
    [s.error]: tabsStatus?.connection === ConnectionStatus.Error,
  });

  return (
    <ListItem onClick={onClick}>
      {tabsStatus && (
        <ListItemGraphic className={statusClassNames} icon='workspaces' />
      )}
      <ListItemText>{tab.title}</ListItemText>
      {tabsStatus?.connection === ConnectionStatus.Error && (
        <Tooltip content={tabsStatus.error}>
          <ListItemMeta icon="error" />
        </Tooltip>
      )}
    </ListItem>
  );
});
