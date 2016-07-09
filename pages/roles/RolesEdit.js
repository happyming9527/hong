"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import {Link} from 'react-router'
import Form from './_Form.js'
import ST from '../../Setting.js'

export default class RolesEdit extends React.Component {
  constructor(props) {
    super(props)
    this.nodeId = this.props.location.query.id
    this.nodeName = this.props.location.query.name
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
      `/api/roles/me?id=${this.nodeId}`)
      .then(result=> {
        that.node = result.data
        that.setState({
          loaded: true
        })
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  submitCallback(values) {
    ST.httpPost(`/api/roles/modify?id=${this.nodeId}`, values)
      .then(result=> {
        ST.info.success(result.text)
        ST.history.replace('/backend/roles')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    return (
      !this.state.loaded ? ST.loading() :
        <div style={{width: '100%', padding: '20px 30px'}}>
        <Row>
          <Breadcrumb separator=">">
            <Breadcrumb.Item><Link to="/backend">首页</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/backend/roles">角色管理</Link></Breadcrumb.Item>
            <Breadcrumb.Item>修改角色({this.nodeName})</Breadcrumb.Item>
          </Breadcrumb>
        </Row>

        <Row gutter={16}>
          <Card>
            <Form oldNode={this.node} submitCallback={this.submitCallback.bind(this)} />
          </Card>
        </Row>
      </div>
    )
  }
}