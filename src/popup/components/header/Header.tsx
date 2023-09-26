import React, {FC, useCallback} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarNavigationIcon, TopAppBarTitle} from '@rmwc/top-app-bar';

export const Header: FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate])

  return (
    <TopAppBar fixed>
      <TopAppBarRow>
        <TopAppBarSection>
          {!isHomePage && <TopAppBarNavigationIcon icon="first_page" onClick={navigateToHome}/>}
          <TopAppBarTitle>{t('common:header-title')}</TopAppBarTitle>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
};
