import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker,Table, Breadcrumb, Card } from 'antd'
import {SingleContainer, SearchFormContainer} from '../../Setting.js'
import List from '../user_feeds/_List.js'
import SearchComponent from '../../componets/SearchComponent.js'

export default class UserFeeds extends SearchComponent {

  url = `/api/user_feeds/my_list?id=${this.props.params.id}`

  render() {
    let breadcrumb = [{name: '用户管理', url: '/backend/gift_orders'}, {name: '我的时光轴'}]

    return this.makeRender(breadcrumb, null, List, true)
  }
}
