import React, {FC} from 'react';
import {createMemoryRouter, RouterProvider, Navigate} from 'react-router-dom';

import {Root, Tabs} from './routes';
import {ErrorPage} from './ErrorPage';
import {RootStore, StoreProvider} from './stores';

import s from './styles.module.scss';

const rootStore = new RootStore();

const router = createMemoryRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Navigate to='/tabs' replace />},
			{
				path: '/tabs',
				element: <Tabs />,
			},
		],
	},
]);

export const App: FC = () => (
	<StoreProvider store={rootStore}>
		<div className={s.app}>
			<RouterProvider router={router} />
		</div>
	</StoreProvider>
);
