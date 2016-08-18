"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import Form from './_Form.js'
import ST, {SingleContainer} from '../../Setting.js'

export default class AdvsAdd extends React.Component {
  constructor(props) {
    super(props)
    this.type = this.props.params.type
    this.nodeName = this.props.location.query.name
    this.state = {
      loaded: false
    }
  }

  submitCallback(values) {
    ST.httpPost(`/api/advs/add`, values)
      .then(result=> {
        ST.info.success('添加成功')
        ST.history.replace('/backend/advs')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    const name = (this.type == 'egc' ? 'html':'外链')
    return (
      <SingleContainer breadcrumb={[{name: '广告管理', url: '/backend/advs'}, {name: `${name}添加`}]}>
        <Form kind={this.type} submitCallback={this.submitCallback.bind(this)} />
      </SingleContainer>
    )
  }
}