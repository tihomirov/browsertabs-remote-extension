import React, {FC, useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {ListItem, ListItemText, ListItemMeta} from '@rmwc/list';
import {Tooltip} from '@rmwc/tooltip';
import {useNavigate} from 'react-router-dom';

import {TabStatus} from '../../components/tab-status';
import {ConnectionStatus} from '../../../common/types';
import {Tab} from '../../stores/tabs-store';

type TabItemProps = Readonly<{
	tab: Readonly<Tab>;
}>;

export const TabItem: FC<TabItemProps> = observer(({tab}) => {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(`/tab/${tab.tab.id}`);
  }, [tab]);

  return (
    <ListItem onClick={onClick}>
      <TabStatus status={tab.status} listIcon />
      <ListItemText>{tab.tab.title}</ListItemText>
      {tab.status === ConnectionStatus.Error && (
        <Tooltip content={tab.error}>
          <ListItemMeta icon="error" />
        </Tooltip>
      )}
    </ListItem>
  );
});
