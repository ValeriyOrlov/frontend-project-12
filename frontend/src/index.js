import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './slices/index';
import init from './init';

const root = ReactDOM.createRoot(document.getElementById('chat'));
init();
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
