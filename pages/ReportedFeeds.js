import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb } from 'antd'
import {SingleContainer} from '../Setting.js'
import List from './reported_feeds/_List.js'
import SearchForm from './reported_feeds/_SearchForm.js'
import SearchComponent from '../componets/SearchComponent.js'

export default class UserFeeds extends SearchComponent {

  url = '/api/reported_feeds/list'
  render() {
    let breadcrumb = [{name: '举报管理'}]

    return this.makeRender(breadcrumb, SearchForm, List)
  }
}
