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
      `/api/articles/me?id=${this.nodeId}`)
      .then(result=> {
        that.node = result.data
        that.setState({
          loaded: true
        })
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  submitCallback(values) {
    ST.httpPost(`/api/articles/modify?id=${this.nodeId}`, values)
      .then(result=> {
        ST.info.success(result.text)
        ST.history.replace('/backend/articles')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    return (
      <ST.Container breadcrumb={[{name: '文章管理', url: '/backend/articles'}, {name: '文章修改'}]}>
        <Row gutter={16}>
          <Card>
            <Form oldNode={this.node} submitCallback={this.submitCallback.bind(this)} />
          </Card>
        </Row>
      </ST.Container>
    )
  }
}