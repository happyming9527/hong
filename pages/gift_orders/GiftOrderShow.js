"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import {Link} from 'react-router'
import Form from './_Form.js'
//import LinkForm from './_LinkForm.js'
import ST, {SingleContainer} from '../../Setting.js'
import {expressCompany} from '../../Locales.js'
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

  render() {
    const ShowRow = (props)=>{
      return <Row style={{marginTop: 10}}>
        <Col span={2} style={{textAlign: 'right', fontWeight: 'bold'}}>{props.name}</Col>
        <Col span={22} style={{textAlign: 'left', paddingLeft: 20}}>{props.value||<span style={{color: 'red'}}>暂无</span>}</Col>
      </Row>
    }
    let that = this;
    return (
      <SingleContainer back={true} loaded={this.state.loaded} breadcrumb={[{name: '礼品订单管理', url: '/backend/gift_orders'}, {name: '修改礼品订单'}]}>
        <div>
          <ShowRow name={'礼品名称'} value={this.state.node.giftName} />
          <ShowRow name={'兑换人账户名'} value={this.state.node.userName} />
          <ShowRow name={'兑换人id'} value={this.state.node.userId} />
          <ShowRow name={'状态'} value={this.state.node.userId} />
          <ShowRow name={'订单状态'} value={this.state.node.orderStatus} />
          <ShowRow name={'收件人名称'} value={this.state.node.accepterName} />
          <ShowRow name={'收件人电话'} value={this.state.node.accepterMobile} />
          <ShowRow name={'收件人地址'} value={this.state.node.accepterAddress} />
          <ShowRow name={'申请时间'} value={this.state.node.addTimeNice} />
          <ShowRow name={'快递公司'} value={expressCompany.fetch(this.state.node.expressCompany)} />
          <ShowRow name={'快递单号'} value={this.state.node.expressNo} />
        </div>
      </SingleContainer>
    )
  }
}