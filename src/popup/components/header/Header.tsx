import React, {FC, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarNavigationIcon, TopAppBarTitle} from '@rmwc/top-app-bar';

export const Header: FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const navigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate])

  return (
    <TopAppBar fixed>
      <TopAppBarRow>
        <TopAppBarSection>
          <TopAppBarNavigationIcon icon="first_page" onClick={navigateToHome}/>
          <TopAppBarTitle>{t('common:header-title')}</TopAppBarTitle>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
};
