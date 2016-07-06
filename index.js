import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router'
import App from './pages/App.js'
import Login from './pages/Login.js'
import Backend from './pages/Backend.js'
import BackendUsers from './pages/BackendUsers.js'
import Error404Page from './pages/Error404Page.js'
import DaiBan from './pages/DaiBan.js'

function requireCredentials(nextState, replace, next) {
  if (window.localStorage.getItem('userInfo')) {
    next()
  } else {
    replace('/Login')
    next()
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Backend} onEnter={requireCredentials} />
      <Route path="backend" component={Backend} onEnter={requireCredentials}>
        <IndexRoute component={DaiBan} />
        <Route path="lohas_users" component={BackendUsers}/>
        <Route path="*" component={Error404Page} />
      </Route>
      <Route path="login" component={Login} />
    </Route>
  </Router>
), document.getElementById('app'))
