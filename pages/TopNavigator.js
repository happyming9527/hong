import React from 'react'
import { render } from 'react-dom'
import {Link} from 'react-router'
import {  Row, Col, Icon, Menu, Dropdown  } from 'antd'
import 'antd/dist/antd.css'
import ST from '../Setting.js'


export default class AExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      current_role_name: null
    }
  }

  componentWillMount() {
    this.fetchData()
  }

  logOut() {
    window.localStorage.removeItem('userInfo')
    fetch('/api/foo/logout', {
        method: 'post',
        body: JSON.stringify({})
      }
    )
      .then(e=>e.json())
      .then(result=> {
        if (result.code && result.code == 1) {
          ST.historyPush('/login')
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
    this.setState({
      name: userInfo.name,
      current_role_name: userInfo.current_role_name
    })
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" href="http://www.alipay.com/">角色1</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" href="http://www.taobao.com/">角色2</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" href="http://www.tmall.com/">角色3</a>
        </Menu.Item>
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
                {this.state.current_role_name} <Icon type="down"/>
              </a>
            </Dropdown>
          </span>
          <span>{this.state.name}</span>
          <a style={{marginLeft: 15}} href="javascript:void(0)" onClick={this.logOut}>登出&nbsp;<Icon
            type="poweroff"/></a>
        </div>
      </Col>
    )
  }
}


