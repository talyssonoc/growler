import React from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Dummy = () => (
  <Router>
    <Route exact path="/" component={() => <div>Growler</div>} />
  </Router>
)

export default ReactDOM.render(
  <Dummy />,
  document.body
)
