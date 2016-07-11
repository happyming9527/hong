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
    this.nodeId = this.props.location.query.id
    this.nodeName = this.props.location.query.name
    this.state = {
      loaded: false
    }
  }

  componentWillMount() {
  }

  submitCallback(values) {
    ST.httpPost(`/api/articles/add`, values)
      .then(result=> {
        ST.info.success(result.text)
        ST.history.replace('/backend/articles')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    return (
      <ST.Container breadcrumb={[{name: '文章管理', url: '/backend/articles'}, {name: '添加文章'}]}>
        <Row gutter={16}>
          <Card>
            <Form submitCallback={this.submitCallback.bind(this)} />
          </Card>
        </Row>
      </ST.Container>
    )
  }
}