import React, {FC} from 'react';

import s from './styles.module.scss';

export const Loader: FC = () => <div className={s.container}>
	<div className={s.loader} />
</div>;
