import './styles.module.scss';

import React, {FC} from 'react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';

import {ThemeProvider} from './components/theme-provider';
import {ErrorPage} from './ErrorPage';
import {Home, Root, TabDetails} from './routes';
import {RootStore, StoreProvider} from './stores';

const rootStore = new RootStore();

const router = createMemoryRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'tab/:tabId',
        element: <TabDetails />,
      },
    ],
  },
]);

export const App: FC = () => (
  <StoreProvider store={rootStore}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StoreProvider>
);
