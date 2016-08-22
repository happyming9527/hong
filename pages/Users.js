import React from 'react'
import {render} from 'react-dom'
import 'antd/dist/antd.css'
import {Collapse, Form, Input, Button, DatePicker, Table, Breadcrumb, Card, Row} from 'antd'
import List from './users/_List.js'
import SearchForm from './users/_SearchForm.js'
import SearchComponent from '../componets/SearchComponent.js'
import {Container, SingleContainer} from '../Setting.js'
import ST from '../Setting.js'

export default class UserFeeds extends SearchComponent {

  url = '/api/users/list'
  keyName = 'userId'

  sendMessageToAll = ()=> {
    ST.history.push('/backend/users/send_message_to_all')
  }

  render() {
    let that = this
    let breadcrumb = [{name: 'app用户列表'}]

    return this.makeRender(breadcrumb, SearchForm, List)

  }
}
