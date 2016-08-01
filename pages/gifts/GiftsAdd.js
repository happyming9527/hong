"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import {Link} from 'react-router'
import Form from './_Form.js'
import ST from '../../Setting.js'

export default class ArticlesAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillMount() {
  }

  submitCallback(values) {
    ST.httpPost(`/api/gifts/add`, values)
      .then(result=> {
        ST.info.success('添加成功')
        ST.history.replace('/backend/gifts')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    return (
      <ST.Container breadcrumb={[{name: '礼品管理', url: '/backend/gifts'}, {name: '添加礼品'}]}>
        <Row>
          <Card>
            <Form kind={this.type} submitCallback={this.submitCallback.bind(this)} />
          </Card>
        </Row>
      </ST.Container>
    )
  }
}