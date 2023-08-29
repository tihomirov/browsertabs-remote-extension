import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';

import {Header} from '../components/header';

import * as s from './styles.module.scss';

export const Root: FC = () => {
  return (
    <div className={s.root}>
      <Header/>
      <div className={s.container}>
        <Outlet />
      </div>
    </div>
  );
};
