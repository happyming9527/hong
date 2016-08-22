"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import {Link} from 'react-router'
import Form from './_ExpressNoForm.js'
import ST, {SingleContainer} from '../../Setting.js'

export default class ArticlesAdd extends React.Component {
  constructor(props) {
    super(props)
    this.giftId = this.props.params.id
  }

  componentWillMount() {
  }

  submitCallback(values) {
    ST.httpPost(`/api/gifts/import_express_no?giftId=${this.giftId}`, values)
      .then(result=> {
        ST.info.success('导入成功')
        ST.historyGoBack()
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    let breadcrumb = [{name: '礼物管理', url: '/backend/gifts'}, {name: '导入订单号'}]

    return (
      <SingleContainer breadcrumb={breadcrumb}>
        <Form kind={this.type} submitCallback={this.submitCallback.bind(this)} />
      </SingleContainer>
    )
  }
}