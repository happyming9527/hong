"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import Form from './_ScoreForm.js'
import ST, {SingleContainer} from '../../Setting.js'

export default class AddScore extends React.Component {

  submitCallback = (values)=> {
    ST.httpPost(`/api/users/add_score?id=${this.props.params.id }`, values)
      .then(result=> {
        ST.info.success('返豆成功.')
        ST.historyGoBack()
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    return (
      <SingleContainer
        breadcrumb={[{name: '用户管理', url: '/backend/users'}, {name: '给单个用户返豆或扣豆'}]}>
        <Form submitCallback={this.submitCallback} />
      </SingleContainer>
    )
  }
}