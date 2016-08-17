import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker,Table, Breadcrumb, Card } from 'antd'
import {SingleContainer, SearchFormContainer} from '../Setting.js'
import List from './user_feeds/_List.js'
import SearchForm from './user_feeds/_SearchForm.js'
import SearchComponent from '../componets/SearchComponent.js'

export default class UserFeeds extends SearchComponent {

  url = '/api/user_feeds/list'
  render() {
    let breadcrumb = [{name: '用户微博管理'}]

    return this.makeRender(breadcrumb, SearchForm, List)
  }
}
