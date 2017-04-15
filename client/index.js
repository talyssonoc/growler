import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import store from 'app/store'

const Dummy = () => (
  <Router>
    <Route exact path="/" component={() => <div>Growler</div>} />
  </Router>
)

export default ReactDOM.render(
  <Provider store={store}>
    <Dummy />
  </Provider>,
  document.body
)
