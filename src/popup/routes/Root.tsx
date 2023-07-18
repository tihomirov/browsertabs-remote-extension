import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

export const Root: FC = () => {
	const {t} = useTranslation();

	return (
		<div>
			<h1>{t('common:header-title')}</h1>
			<div>
				<Outlet />
			</div>
		</div>
	);
};
