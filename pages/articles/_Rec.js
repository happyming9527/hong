"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import Form from '../user_feeds/_TimeForm.js'
import ST, {SingleContainer} from '../../Setting.js'

export default class Rec extends React.Component {

  submitCallback = (values)=> {
    ST.httpPost(`/api/articles/rec?id=${this.props.params.id }`, values)
      .then(result=> {
        ST.info.success('操作成功.')
        ST.history.replace('/backend/articles')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    return (
      <SingleContainer
        breadcrumb={[{name: 'egc管理', url: '/backend/articles'}, {name: '推荐'}]}>
        <Form submitCallback={this.submitCallback} />
      </SingleContainer>
    )
  }
}