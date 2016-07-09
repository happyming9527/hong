import React from 'react'
import { render } from 'react-dom'
import {Link} from 'react-router'
import {  Row, Col, Icon, Menu, Dropdown  } from 'antd'
import 'antd/dist/antd.css'
import ST from '../Setting.js'


export default class TopNavigator extends React.Component {
  constructor(props) {
    super(props)
    this.roles = []
  }

  componentWillMount() {
    this.fetchData()
  }

  logOut() {
    ST.storage.removeItem('userInfo')
    ST.httpPost('/api/logins/logout')
      .then(result=> {
          ST.history.push('/login')
          ST.info.success(result.text)
      }).catch(e=>ST.info.error(e.message)).done
  }

  fetchData() {
    let userInfo = JSON.parse(ST.storage.getItem('userInfo'))
    this.name = userInfo.name
    this.current_role = userInfo.current_role
    this.roles = userInfo.roles
  }

  changeRole(ele) {
    ST.httpPost('/api/account/change_role', { role_id: ele.id})
      .then(result=>{
        ST.storage.setItem('userInfo', JSON.stringify(result.data))
        ST.historyReload('backend')
        ST.info.success('修改当前角色成功!')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    const menu = (
      <Menu>
        {
          this.roles.map(ele=>{
            return <Menu.Item key={ele.id}>
              <a href="javascript:void(0)"
                 onClick={
                   ()=>{
                      this.changeRole(ele)
                   }}
              >
                {ele.name}
              </a>
            </Menu.Item>
          })
        }
      </Menu>
    );

    return (
      <Col span={24}
           style={{height: 50, backgroundColor: '#262626', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 100, paddingLeft: 50, color: 'white'}}>
        <div>
          <Link to='/backend' style={{fontSize: 16, fontWeight: 'bold'}}>彩虹后台管理系统</Link>
        </div>
        <div>
          <span style={{marginRight: 10}}>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                当前角色: {this.current_role.name} <Icon type="down"/>
              </a>
            </Dropdown>
          </span>
          <span>{this.name}</span>
          <a style={{marginLeft: 15}} href="javascript:void(0)" onClick={this.logOut}>登出&nbsp;<Icon
            type="poweroff"/></a>
        </div>
      </Col>
    )
  }
}


