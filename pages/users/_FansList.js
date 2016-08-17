import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST, {SingleContainer} from '../../Setting.js'
import List from './_List.js'
import SearchForm from './_SearchForm.js'
import SearchComponent from '../../componets/SearchComponent.js'


export default class FansList extends SearchComponent {
  url = `/api/users/fans_list?userId=${this.props.params.id}`
  keyName = 'userId'
  render() {
    let that = this
    let breadcrumb = [
      {name: 'app用户列表', url: '/backend/users'},
      {name: '粉丝列表'}
    ]
    return this.makeRender(breadcrumb, SearchForm, List, true)
  }
}