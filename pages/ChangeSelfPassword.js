"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import {Link} from 'react-router'
import Form from './backend_users/_PasswordForm.js'
import ST from '../Setting.js'

export default class RolesEdit extends React.Component {
  constructor(props) {
    super(props)
    this.nodeId = this.props.params.id
    this.state = {
      loaded: false,
      node: null
    }
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    let that = this
    ST.httpPost(
      `/api/backend_users/me`)
      .then(result=> {
        that.node = result.data
        that.setState({
          loaded: true
        })
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  submitCallback(values) {
    ST.httpPost(`/api/backend_users/change_self_password`, values)
      .then(result=> {
        ST.info.success(result.text)
        ST.history.replace('/backend/backend_users')
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
              <Breadcrumb.Item>密码管理</Breadcrumb.Item>
            </Breadcrumb>
          </Row>

          <Row>
            <Card>
              <Form
                oldNode={this.node}
                submitCallback={this.submitCallback.bind(this)} />
            </Card>
          </Row>
        </div>
    )
  }
}