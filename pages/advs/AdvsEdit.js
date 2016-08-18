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
      `/api/advs/me?id=${this.nodeId}`)
      .then(result=> {
        that.node = result.data
        debugger
        that.setState({
          loaded: true
        })
      })
      .catch(e=>console.log(e.stack)&&ST.info.error(e.message)).done
  }

  submitCallback(values) {
    ST.httpPost(`/api/advs/modify?feedId=${this.nodeId}`, values)
      .then(result=> {
        ST.info.success('修改成功')
        ST.history.replace('/backend/advs')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    const name = (this.type == 'egc' ? 'html':'外链')
    const breadcrumb = [{name: '广告管理', url: '/backend/advs'}, {name: `${name}修改`}]
    return (
      <SingleContainer breadcrumb={breadcrumb}>
        <Form kind={this.type} oldNode={this.node} submitCallback={this.submitCallback.bind(this)} />
      </SingleContainer>
    )
  }
}