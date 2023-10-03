import {CircularProgress, CircularProgressProps} from '@rmwc/circular-progress';
import React, {FC} from 'react';

import * as s from './styles.module.scss';

export const Loader: FC<CircularProgressProps> = (props) => (
  <div className={s.container}>
    <CircularProgress {...props}/>
  </div>
);
