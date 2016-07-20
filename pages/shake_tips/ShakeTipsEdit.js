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
      `/api/shake_tips/me?id=${this.nodeId}`)
      .then(result=> {
        that.node = result.data
        that.setState({
          loaded: true
        })
      })
      .catch(e=>console.log(e.stack)&&ST.info.error(e.message)).done
  }

  submitCallback(values) {
    ST.httpPost(`/api/shake_tips/modify?id=${this.nodeId}`, values)
      .then(result=> {
        ST.info.success('修改成功')
        ST.history.replace('/backend/shake_tips')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    const kind = true ? 'egc':'link'
    const name = true ? '摇一摇便签修改':'链接修改'
    return (
      <ST.Container breadcrumb={[{name: '摇一摇便签管理', url: '/backend/shake_tips'}, {name: name}]}>
        <Row gutter={16}>
          <Card>
            <Form kind={kind} oldNode={this.node} submitCallback={this.submitCallback.bind(this)} />
          </Card>
        </Row>
      </ST.Container>
    )
  }
}