import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import {SingleContainer} from '../Setting.js'
import List from './blacklist/_List.js'
import SearchForm from './blacklist/_SearchForm.js'
import SearchComponent from '../componets/SearchComponent.js'

export default class BackendUser extends SearchComponent {
  url = '/api/blacklist/list'
  keyName = 'id'

  render() {
    let that = this
    let breadcrumb=[{name: '黑名单管理'}]
    return this.makeRender(breadcrumb, SearchForm, List)
  }
}