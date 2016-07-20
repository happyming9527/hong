"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import {Link} from 'react-router'
import Form from './_Form.js'
import ST from '../../Setting.js'

export default class ArticlesAdd extends React.Component {
  constructor(props) {
    super(props)
    this.type = this.props.params.type
    this.nodeName = this.props.location.query.name
    this.state = {
      loaded: false
    }
  }

  componentWillMount() {
  }

  submitCallback(values) {
    ST.httpPost(`/api/shake_tips/add`, values)
      .then(result=> {
        ST.info.success('添加成功')
        ST.history.replace('/backend/shake_tips')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    const name = (this.type == 'egc' ? '摇一摇便签':'外链')
    return (
      <ST.Container breadcrumb={[{name: '摇一摇便签管理', url: '/backend/shake_tips'}, {name: name}]}>
        <Row gutter={16}>
          <Card>
            <Form kind={this.type} submitCallback={this.submitCallback.bind(this)} />
          </Card>
        </Row>
      </ST.Container>
    )
  }
}