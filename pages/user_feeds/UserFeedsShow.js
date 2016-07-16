"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import {Link} from 'react-router'
import ST from '../../Setting.js'
import Form from './_Form.js'

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
      `/api/user_feeds/me?id=${this.nodeId}`)
      .then(result=> {
        that.node = result.data
        that.setState({
          loaded: true
        })
      })
      .catch(e=>console.log(e.stack)&&ST.info.error(e.message)).done
  }

  render() {
    return (
      <ST.Container breadcrumb={[{name: '用户微博管理', url: '/backend/user_feeds'}, {name: '微博查看'}]}>
        <Row gutter={16}>
          <Card>
            <Form oldNode={this.node} submitCallback={()=>{}} />
          </Card>
        </Row>
      </ST.Container>
    )
  }
}