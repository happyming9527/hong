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
      `/api/topics/me?id=${this.nodeId}`)
      .then(result=> {
        that.node = result.data
        that.setState({
          loaded: true
        })
      })
      .catch(e=>console.log(e.stack)&&ST.info.error(e.message)).done
  }

  render() {
    const kind = true ? 'egc':'link'
    const name = true ? '话题查看':'链接查看'
    return (
      <ST.Container breadcrumb={[{name: '话题管理', url: '/backend/topics'}, {name: name}]}>
        <Row gutter={16}>
          <Card>
            <Form readonly={true} kind={kind} oldNode={this.node} submitCallback={()=>{}} />
          </Card>
        </Row>
      </ST.Container>
    )
  }
}