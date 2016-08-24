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
      `/api/advs/me?id=${this.nodeId}`)
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
    return (
      <ST.Container breadcrumb={[{name: '广告管理', url: '/backend/advs'}, {name: '广告查看'}]}>
        <Row>
          <Card>
            <Form readonly={true} kind={kind} oldNode={this.node} submitCallback={()=>{}} />
          </Card>
        </Row>
      </ST.Container>
    )
  }
}