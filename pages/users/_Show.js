"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import {Link} from 'react-router'
import ST, {SingleContainer} from '../../Setting.js'

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
      `/api/users/me?id=${this.nodeId}`)
      .then(result=> {
        that.setState({
          node: result.data,
          loaded: true
        })
      })
      .catch(e=>console.log(e.stack)&&ST.info.error(e.message)).done
  }

  render() {

    const ShowRow = (props)=> {
      return <Row style={{marginTop: 10}}>
        <Col span={2} style={{textAlign: 'right', fontWeight: 'bold'}}>{props.name}</Col>
        <Col span={22} style={{textAlign: 'left', paddingLeft: 20}}>{props.value ||
        <span style={{color: 'red'}}>暂无</span>}</Col>
      </Row>
    }

    let breadcrumb = [{name: '用户管理', url: '/backend/gift_orders'}, {name: '查看用户'}];

    return (
      <SingleContainer
        back={true}
        loaded={this.state.loaded}
        breadcrumb={breadcrumb}>
        <div>
          <ShowRow name={'用户名称'} value={this.state.node.name} />
          <ShowRow name={'用户生日'} value={this.state.node.birthDate} />
        </div>
      </SingleContainer>
    )
  }
}