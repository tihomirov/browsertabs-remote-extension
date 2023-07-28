import React, {FC} from 'react';
import {useParams} from 'react-router-dom';

import s from './styles.module.scss';

export const ConnectTab: FC = () => {
	const {tabId} = useParams();

	return (
		<div className={s.tab}>
			<span className={s.title}>Tab Id: {tabId}</span>
		</div>
	);
};
