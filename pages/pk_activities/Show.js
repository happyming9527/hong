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
      `/api/pk_activities/me?id=${this.nodeId}`)
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

    let breadcrumb = [{name: 'pk活动管理', url: '/backend/pk_activities'}, {name: 'pk活动查看'}];

    return (
      <SingleContainer
        back={true}
        loaded={this.state.loaded}
        breadcrumb={breadcrumb}>
        <div>
          <ShowRow name={'标题'} value={this.state.node.title} />
          <ShowRow name={'开始日期'} value={this.state.node.startDateNice} />
          <ShowRow name={'结束日期'} value={this.state.node.endDateNice} />
        </div>
      </SingleContainer>
    )
  }
}