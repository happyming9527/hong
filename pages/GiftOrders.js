import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import List from './gift_orders/_List.js'
import SearchForm from './gift_orders/_SearchForm.js'
import SearchComponent from '../componets/SearchComponent.js'

export default class BackendUser extends SearchComponent {
  url = '/api/gift_orders/list'

  render() {
    let that = this
    let breadcrumb = [{name: '礼品订单列表'}]
    return this.makeMiniRender(breadcrumb, SearchForm, List)
  }
}