import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import s from './styles.module.scss';

export const Root: FC = () => {
	const {t} = useTranslation();

	return (
		<div className={s.root}>
			<h1 className={s.title}>{t('common:header-title')}</h1>
			<div className={s.container}>
				<Outlet />
			</div>
		</div>
	);
};
