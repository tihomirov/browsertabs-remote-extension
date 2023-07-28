import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import s from './styles.module.scss';

export const Header: FC = () => {
	const {t} = useTranslation();
	const navigate = useNavigate();

	return (
		<div className={s.header}>
			<div onClick={() => navigate(-1)}>Back</div>
			<h1>{t('common:header-title')}</h1>
		</div>
	);
};
