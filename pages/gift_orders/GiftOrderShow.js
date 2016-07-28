"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import {Link} from 'react-router'
import Form from './_Form.js'
//import LinkForm from './_LinkForm.js'
import ST from '../../Setting.js'

export default class RolesEdit extends React.Component {
  constructor(props) {
    super(props)
    this.nodeId = this.props.params.id
    this.state = {
      node: {},
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
        that.setState({
          node: result.data,
          loaded: true
        })
      })
      .catch(e=>console.log(e.stack)&&ST.info.error(e.message)).done
  }

  submitCallback(values) {
    ST.httpPost(`/api/gift_orders/send_gift?id=${this.nodeId}`, values)
      .then(result=> {
        ST.info.success('发货成功')
        ST.history.replace('/backend/gift_orders')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    let that = this;
    debugger
    return (
      <ST.Container loaded={this.state.loaded} breadcrumb={[{name: '礼品订单管理', url: '/backend/gift_orders'}, {name: '修改礼品订单'}]}>
        <Row gutter={16}>
          <Card>
            <Row>
              <Col span={4}>礼品名称</Col>
              <Col span={20}>{this.state.node.giftName}</Col>
            </Row>
          </Card>
        </Row>
      </ST.Container>
    )
  }
}