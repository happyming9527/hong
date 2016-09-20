"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import Form from './_GrowthForm.js'
import ST, {SingleContainer} from '../../Setting.js'

export default class AddScore extends React.Component {

  submitCallback = (values)=> {
    ST.httpPost(`/api/users/add_growth?id=${this.props.params.id }`, values)
      .then(result=> {
        ST.info.success('返成长值成功.')
        ST.historyGoBack()
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    return (
      <SingleContainer
        breadcrumb={[{name: '用户管理', url: '/backend/users'}, {name: '给单个用户返成长值或扣成长值'}]}>
        <Form submitCallback={this.submitCallback} />
      </SingleContainer>
    )
  }
}