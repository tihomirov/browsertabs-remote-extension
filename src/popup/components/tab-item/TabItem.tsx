import classNames from 'classnames';
import React, {FC, useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {ListItem, ListItemGraphic, ListItemText, ListItemMeta} from '@rmwc/list';
import {Tooltip} from '@rmwc/tooltip';
import {useNavigate} from 'react-router-dom';

import {ConnectionStatus} from '../../../common/types';
import {Tab} from '../../stores/tabs-store';

import * as s from './styles.module.scss';

type TabItemProps = Readonly<{
	tab: Readonly<Tab>;
}>;

export const TabItem: FC<TabItemProps> = observer(({tab}) => {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(`/tab/${tab.tab.id}`)
  }, [tab])

  const statusClassNames = classNames(s.statusIcon, {
    [s.closed]: tab.status === ConnectionStatus.Closed,
    [s.connected]: tab.status === ConnectionStatus.Connected,
    [s.open]: tab.status === ConnectionStatus.Open,
    [s.error]: tab.status === ConnectionStatus.Error,
  });

  return (
    <ListItem onClick={onClick}>
      <ListItemGraphic className={statusClassNames} icon='workspaces' />
      <ListItemText>{tab.tab.title}</ListItemText>
      {tab.status === ConnectionStatus.Error && (
        <Tooltip content={tab.error}>
          <ListItemMeta icon="error" />
        </Tooltip>
      )}
    </ListItem>
  );
});
