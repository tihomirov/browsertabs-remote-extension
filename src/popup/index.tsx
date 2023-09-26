import React from 'react';
import {createRoot} from 'react-dom/client';

import {App} from './App';

import './i18n';

const container = document.querySelector('#root')!;

const root = createRoot(container);
root.render(
  // TODO https://github.com/rmwc/rmwc/issues/815
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
);

