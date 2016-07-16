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
import Articles from './pages/Articles.js'
import ArticlesEdit from './pages/articles/ArticlesEdit.js'
import ArticlesAdd from './pages/articles/ArticlesAdd.js'
import ArticlesShow from './pages/articles/ArticlesShow.js'
import UserFeed from './pages/UserFeeds.js'
import UserFeedsShow from './pages/user_feeds/UserFeedsShow.js'
import Activities from './pages/Activities.js'

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
        <Route path="roles" component={App}>
          <IndexRoute component={Roles} />
          <Route path="add" component={RolesAdd}/>
          <Route path="edit" component={RolesEdit}/>
          <Route path="edit_menus" component={RolesEditMenus}/>
        </Route>
        <Route path="articles" component={App}>
          <IndexRoute component={Articles} />
          <Route path="edit/:id" component={ArticlesEdit}/>
          <Route path="show/:id" component={ArticlesShow}/>
          <Route path="add/:type" component={ArticlesAdd}/>
        </Route>
        <Route path="user_feeds" component={App}>
          <IndexRoute component={UserFeed} />
          <Route path="show/:id" component={UserFeedsShow}/>
        </Route>
        <Route path="activities" component={App}>
          <IndexRoute component={Activities} />
        </Route>
        <Route path="*" component={Error404Page} />
      </Route>
      <Route path="login" component={Login} />
    </Route>
  </Router>
), document.getElementById('app'))
