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
    this.state = {
    }
  }

  componentWillMount() {
  }

  submitCallback(values) {
    ST.httpPost(`/api/roles/add`, values)
      .then(result=> {
        ST.info.success(result.text)
        ST.history.replace('/backend/roles')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    return (
      <div style={{width: '100%', padding: '20px 30px'}}>
        <Row>
          <Breadcrumb separator=">">
            <Breadcrumb.Item><Link to="/backend">首页</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/backend/roles">角色管理</Link></Breadcrumb.Item>
            <Breadcrumb.Item>新增角色</Breadcrumb.Item>
          </Breadcrumb>
        </Row>

        <Row>
          <Card>
            <Form submitCallback={this.submitCallback.bind(this)} />
          </Card>
        </Row>
      </div>
    )
  }
}