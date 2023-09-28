import React, {FC, useState} from 'react';
import {Outlet} from 'react-router-dom';

import {Header} from '../components/header';
import s from './styles.module.scss';

export const Root: FC = () => {
  const [scrollTarget, setScrollTarget] = useState<HTMLDivElement | null>(null);

  return (
    <div className={s.container} ref={setScrollTarget}>
      {scrollTarget && <Header scrollTarget={scrollTarget}/>}
      <div className={s.outletContainer}>
        <Outlet />
      </div>
    </div>
  );
};
