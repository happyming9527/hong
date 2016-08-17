"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import Form from './_MessageForm.js'
import ST, {SingleContainer} from '../../Setting.js'

export default class ArticlesAdd extends React.Component {

  submitCallback = (values)=> {
    ST.httpPost(`/api/users/send_message?id=${this.props.params.id }`, values)
      .then(result=> {
        ST.info.success('广播发送成功.')
        ST.history.replace('/backend/users')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    return (
      <SingleContainer
        breadcrumb={[{name: '用户管理', url: '/backend/users'}, {name: '给单个用户发送广播'}]}>
        <Form submitCallback={this.submitCallback} />
      </SingleContainer>
    )
  }
}