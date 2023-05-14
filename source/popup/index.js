import React from 'react';
import * as ReactDOM from 'react-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

root.render(element);

// const root = document.querySelector('#root');
//
// render(
//   <React.StrictMode>
//     {element}
//   </React.StrictMode>,
//   root,
// );
