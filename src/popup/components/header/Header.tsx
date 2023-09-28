import React, {FC, useCallback, useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react-lite';
import {TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarNavigationIcon, TopAppBarTitle} from '@rmwc/top-app-bar';
import {useStores} from '../../hooks';

export const Header: FC = observer(() => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const {tabsStore} = useStores();
  const isHomePage = location.pathname === '/';

  const title = useMemo(() => {
    if (isHomePage) {
      return t('common:header-title')
    }
    return tabsStore.currentTab?.title || t('common:header-title');
  }, [tabsStore.currentTab, t])

  const navigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate])

  return (
    <TopAppBar fixed>
      <TopAppBarRow>
        <TopAppBarSection>
          {!isHomePage && <TopAppBarNavigationIcon icon="first_page" onClick={navigateToHome}/>}
          <TopAppBarTitle>{title}</TopAppBarTitle>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
});
