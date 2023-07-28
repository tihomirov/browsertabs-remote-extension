import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {Header} from '../components/header';

import s from './styles.module.scss';

export const Root: FC = () => {
	const {t} = useTranslation();

	return (
		<div className={s.root}>
			<Header/>
			<div className={s.container}>
				<Outlet />
			</div>
		</div>
	);
};
