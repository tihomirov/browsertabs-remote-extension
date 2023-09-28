import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';

import {Header} from '../components/header';
import s from './styles.module.scss';

export const Root: FC = () => {
  return (
    <>
      <Header/>
      <div className={s.outletContainer}>
        <Outlet />
      </div>
    </>
  );
};
