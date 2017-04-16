import React from 'react';

import { Provider } from 'react-redux';

import Router from 'Router';
import store from 'app/store';

const Application = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default Application;
