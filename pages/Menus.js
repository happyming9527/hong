"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import List from 'list-to-tree'
import { Menu, Icon } from 'antd';
import ST from '../Setting.js'

const SubMenu = Menu.SubMenu;

export default class Sider extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      current: '1',
      openKeys: [],
    }
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.flatenMenus = userInfo.menus.map(
      i=>{
        if (i.ancestry) {
         i.listOrderNum = parseInt(i.ancestry)
        } else {
          i.listOrderNum = null
        }
        return i
      }
    )
    let ltt = new List(this.flatenMenus, {
      key_id: 'id',
      key_parent: 'listOrderNum'
    })
    var tree = ltt.GetTree()
    this.menus = tree
    this.setState({
      openKeys: this.menus.map(ele=>ele.id.toString())
    })
  }

  handleKeyPath(ele) {
    let oldOpenKeys = this.state.openKeys.slice()
    let key = ele.keyPath[0]
    if (ele.open) {
      oldOpenKeys.push(key)
    } else {
      let index = oldOpenKeys.indexOf(key)
      if (index>-1) {
        oldOpenKeys.splice(oldOpenKeys.indexOf(key), 1)
      }
    }
    return oldOpenKeys
  }

  handleClick(e) {
    let openKeys = this.handleKeyPath(e)
    let currentItem = this.flatenMenus.find(ele=>ele.id.toString() === e.key )
    ST.historyPush(currentItem.url)
    this.setState({
      current: e.key,
      openKeys: openKeys,
    });
  }

  onToggle(info) {
    let openKeys = this.handleKeyPath(info)
    this.setState({
      openKeys: openKeys,
    });
  }

  parseMenusList(obj) {
    let { child, id, name} = obj
    if (child) {
      return (
        <SubMenu key={ id } title={ name }>
          {
            child.map(ele=>{
              return this.parseMenusList(ele)
            })
          }
        </SubMenu>
      )
    } else {
      return <Menu.Item key={id}>{name}</Menu.Item>
    }
  }

  render() {
    return (
      <Menu onClick={this.handleClick.bind(this)}
            style={{ width: 240, flex: 1 }}
            openKeys={this.state.openKeys}
            onOpen={this.onToggle.bind(this)}
            onClose={this.onToggle.bind(this)}
            selectedKeys={[this.state.current]}
            mode="inline"
      >
        {
          this.menus.map(ele=>{
            return this.parseMenusList(ele)
          })
        }
      </Menu>
    )
  }
}

export default Sider