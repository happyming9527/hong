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
    window.localStorage.removeItem('userInfo')
    fetch('/api/foo/logout', {
        method: 'post',
        credentials: 'include',
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify({})
      }
    )
      .then(e=>e.json())
      .then(result=> {
        if (result.code && result.code == 1) {
          ST.history.push('/login')
          ST.info.success(result.text)
        } else {
          ST.info.error(result.text)
        }
      }).catch(e=> {
      ST.info.error(e.message)
    })
  }

  fetchData() {
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.name = userInfo.name
    this.current_role = userInfo.current_role
    this.roles = userInfo.roles
  }

  changeRole(ele) {
    fetch('/api/foo/change_role', {
      method: 'post',
      credentials: 'include',
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify({
        role_id: ele.id
      })}
    )
      .then(e=>e.json())
      .then(result=>{
        if (result.code && result.code == 1) {
          window.localStorage.setItem('userInfo', JSON.stringify(result.data))
          ST.historyReload('backend')
          ST.info.success('修改当前角色成功!')
        } else {
          alert(result.text || '网络连接失败')
        }
      }).catch(e=>{
      ST.info.error(e.message)
    })
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


