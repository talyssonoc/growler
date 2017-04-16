import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Main from 'presentation/Main';

const Router = () => (
  <BrowserRouter>
    <Route path="/" component={Main} />
  </BrowserRouter>
);

export default Router;
