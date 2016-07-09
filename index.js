import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router'
import ST from './Setting.js'
import App from './pages/App.js'
import Login from './pages/Login.js'
import Backend from './pages/Backend.js'
import Error404Page from './pages/Error404Page.js'
import DaiBan from './pages/DaiBan.js'
import BackendUsers from './pages/BackendUsers.js'
import BackendUsersAdd from './pages/backend_users/BackendUsersAdd.js'
import BackendUserEditRoles from './pages/backend_users/BackendUserEditRoles.js'
import BackendUserEdit from './pages/backend_users/BackendUserEdit.js'
import ChangeSelfPassword from './pages/ChangeSelfPassword.js'
import Menus from './pages/Menus.js'
import Roles from './pages/Roles.js'
import RolesEdit from './pages/roles/RolesEdit.js'
import RolesEditMenus from './pages/roles/RolesEditMenus.js'
import RolesAdd from './pages/roles/RolesAdd.js'
import WriteFeed from './pages/WriteFeed.js'

function requireCredentials(nextState, replace, next) {
  if (ST.storage.getItem('userInfo')) {
    next()
  } else {
    replace('/login')
    next()
  }
}

render((
  <Router history={browserHistory}>
    <Redirect from={'/'} to={'backend'} />
    <Route path="/" component={App}>
      <Route path="backend" component={Backend} onEnter={requireCredentials}>
        <IndexRoute component={DaiBan} />
        <Route path="backend_users" component={App}>
          <IndexRoute component={BackendUsers} />
          <Route path="add" component={BackendUsersAdd}/>
          <Route path="edit/:id" component={BackendUserEdit}/>
          <Route path="edit_roles/:id" component={BackendUserEditRoles}/>
        </Route>
        <Route path="change_self_password" component={ChangeSelfPassword}/>
        <Route path="menus" component={Menus}/>
        <Route path="write_feed" component={WriteFeed}/>
        <Route path="roles" component={App}>
          <IndexRoute component={Roles} />
          <Route path="add" component={RolesAdd}/>
          <Route path="edit" component={RolesEdit}/>
          <Route path="edit_menus" component={RolesEditMenus}/>
        </Route>
        <Route path="*" component={Error404Page} />
      </Route>
      <Route path="login" component={Login} />
    </Route>
  </Router>
), document.getElementById('app'))
