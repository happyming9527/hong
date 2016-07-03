import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './pages/App.js'
import Login from './pages/Login.js'
import Backend from './pages/Backend.js'
import BackendUsers from './pages/BackendUsers.js'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="backend" component={Backend}>
        <Route path="backend_users" component={BackendUsers}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))
