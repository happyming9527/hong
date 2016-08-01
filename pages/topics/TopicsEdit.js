"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import {Link} from 'react-router'
import Form from './_Form.js'
import ST, {SingleContainer} from '../../Setting.js'

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

  submitCallback(values) {
    ST.httpPost(`/api/topics/modify?id=${this.nodeId}`, values)
      .then(result=> {
        ST.info.success('修改成功')
        ST.history.replace('/backend/topics')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    const kind = true ? 'egc':'link'
    const name = true ? '话题修改':'链接修改'
    const breadcrumb = [{name: '话题管理', url: '/backend/topics'}, {name: name}]
    return (
      <SingleContainer breadcrumb={breadcrumb}>
        <Form kind={kind} oldNode={this.node} submitCallback={this.submitCallback.bind(this)} />
      </SingleContainer>
    )
  }
}