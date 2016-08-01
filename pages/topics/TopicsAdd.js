"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import {Link} from 'react-router'
import Form from './_Form.js'
import ST, {SingleContainer} from '../../Setting.js'

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
    ST.httpPost(`/api/topics/add`, values)
      .then(result=> {
        ST.info.success('添加成功')
        ST.history.replace('/backend/topics')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    const name = (this.type == 'egc' ? '话题':'外链')
    return (
      <SingleContainer breadcrumb={[{name: '话题管理', url: '/backend/topics'}, {name: name}]}>
        <Form kind={this.type} submitCallback={this.submitCallback.bind(this)} />
      </SingleContainer>
    )
  }
}