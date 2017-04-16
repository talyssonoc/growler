import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Dummy from 'presentation/Dummy';

const Router = () => (
  <BrowserRouter>
    <Route exact path="/" component={Dummy} />
  </BrowserRouter>
);

export default Router;
