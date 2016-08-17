import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST, {Container, SingleContainer} from '../Setting.js'
import List from './activities/_List.js'
import SearchComponent from '../componets/SearchComponent.js'
const Panel = Collapse.Panel;

export default class Activities extends SearchComponent {
  url = '/api/activities/list'

  addEgc() {
    ST.history.push('/backend/activities/add/egc')
  }

  addLink() {
    ST.history.push('/backend/activities/add/link')
  }

  render() {
    let that = this
    return (
      <Container breadcrumb={[{name: '活动列表'}]}>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          <Button type="primary" htmlType="submit" onClick={this.addEgc.bind(this)}>新增活动</Button>
        </Row>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          {this.makeList(List)}
        </Row>
      </Container>
    )
  }
}