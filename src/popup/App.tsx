import React, {FC} from 'react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';

import {Root, Home, TabDetails} from './routes';
import {ErrorPage} from './ErrorPage';
import {RootStore, StoreProvider} from './stores';
import {ThemeProvider} from './components/theme-provider';

import './styles.module.scss';

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
