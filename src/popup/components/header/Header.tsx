import React, {FC, useCallback, useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react-lite';
import {TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarNavigationIcon, TopAppBarTitle, TopAppBarFixedAdjust} from '@rmwc/top-app-bar';

import {useStores} from '../../hooks';

type HeaderProps = Readonly<{
  scrollTarget: Element;
}>;

export const Header: FC<HeaderProps> = observer(({scrollTarget}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const {tabsStore} = useStores();
  const isHomePage = location.pathname === '/';

  const title = useMemo(() => {
    if (isHomePage) {
      return t('common:header-title');
    }
    return tabsStore.currentTab?.tab.title || t('common:header-title');
  }, [tabsStore.currentTab, t]);

  const navigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <>
      <TopAppBar fixed scrollTarget={scrollTarget}>
        <TopAppBarRow>
          <TopAppBarSection>
            {!isHomePage && <TopAppBarNavigationIcon icon="first_page" onClick={navigateToHome}/>}
            <TopAppBarTitle>{title}</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
    </>
  );
});
