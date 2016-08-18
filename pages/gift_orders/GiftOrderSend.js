"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import Form from './_Form.js'
import ST from '../../Setting.js'

export default class RolesEdit extends React.Component {
  constructor(props) {
    super(props)
    this.nodeId = this.props.params.id
    this.state = {
      loaded: false
    }
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    let that = this
    ST.httpPost(
      `/api/gift_orders/me?id=${this.nodeId}`)
      .then(result=> {
        that.node = result.data
        that.setState({
          loaded: true
        })
      })
      .catch(e=>console.log(e.stack)&&ST.info.error(e.message)).done
  }

  submitCallback(values) {
    ST.httpPost(`/api/gift_orders/send_gift?id=${this.nodeId}`, values)
      .then(result=> {
        ST.info.success('修改成功')
        ST.history.replace('/backend/gift_orders')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    return (
      <ST.Container breadcrumb={[{name: '礼品订单管理', url: '/backend/gift_orders'}, {name: '修改礼品订单'}]}>
        <Row>
          <Card>
            <Form oldNode={this.node} submitCallback={this.submitCallback.bind(this)} />
          </Card>
        </Row>
      </ST.Container>
    )
  }
}