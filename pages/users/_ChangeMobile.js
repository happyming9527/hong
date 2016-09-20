"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import Form from './_MobileForm.js'
import ST, {SingleContainer} from '../../Setting.js'

export default class ChangeMobile extends React.Component {

  submitCallback = (values)=> {
    ST.httpPost(`/api/users/change_mobile?user_id=${this.props.params.id }`, values)
      .then(result=> {
        ST.info.success('更换手机号成功.')
        ST.history.replace('/backend/users')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    return (
      <SingleContainer
        breadcrumb={[{name: '用户管理', url: '/backend/users'}, {name: '用户更换手机号'}]}>
        <Form submitCallback={this.submitCallback} />
      </SingleContainer>
    )
  }
}