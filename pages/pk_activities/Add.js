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
    this.state = {
      loaded: false
    }
  }

  componentWillMount() {
  }

  submitCallback(values) {
    ST.httpPost(`/api/pk_activities/create_activity`, values)
      .then(result=> {
        ST.info.success('添加成功')
        ST.history.replace('/backend/pk_activities')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    let breadcrumb = [{name: '活动管理', url: '/backend/pk_activities'}, {name: '添加活动'}]
    return (
      <SingleContainer
        breadcrumb={breadcrumb}>
        <Form submitCallback={this.submitCallback.bind(this)} />
      </SingleContainer>
    )
  }
}