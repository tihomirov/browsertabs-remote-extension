import React, {FC} from 'react';
import {createMemoryRouter, RouterProvider, Navigate} from 'react-router-dom';

import {Root, Tabs} from './routes';
import {ErrorPage} from './ErrorPage';
import './styles.css';

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
	<div className='app'>
		<RouterProvider router={router} />
	</div>
);
