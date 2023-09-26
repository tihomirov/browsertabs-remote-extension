import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';

import {Header} from '../components/header';

export const Root: FC = () => {
  return (
    <>
      <Header/>
      <Outlet />
    </>
  );
};
