import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST, {Container, SingleContainer} from '../Setting.js'
import List from './topics/_List.js'
import {Link} from 'react-router'
const Panel = Collapse.Panel;
import SearchComponent from '../componets/SearchComponent.js'

export default class BackendUser extends SearchComponent {
  url = '/api/topics/list'

  addEgc() {
    ST.history.push('/backend/topics/add/egc')
  }

  addLink() {
    ST.history.push('/backend/topics/add/link')
  }



  render() {
    let that = this
    return (
      <Container breadcrumb={[{name: '话题列表'}]}>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          <Button type="primary" htmlType="submit" onClick={this.addEgc.bind(this)}>新增话题</Button>
        </Row>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          {this.makeList(List)}
        </Row>
      </Container>
    )
  }
}