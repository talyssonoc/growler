import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import store from 'app/store'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Dummy from 'presentation/Dummy'

const App = () => (
  <Router>
    <Route exact path="/" component={Dummy} />
  </Router>
)

export default ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body
)
