import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST, {Container, SingleContainer} from '../Setting.js'
import List from './gifts/_List.js'
import SearchComponent from '../componets/SearchComponent.js'
const Panel = Collapse.Panel;

export default class BackendUser extends SearchComponent {
  url = '/api/gifts/list'

  addEgc() {
    ST.history.push('/backend/gifts/add')
  }

  render() {
    return (
      <Container breadcrumb={[{name: '礼品列表'}]}>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          <Button type="primary" htmlType="submit" onClick={this.addEgc.bind(this)}>新增礼品</Button>
        </Row>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          {this.makeList(List)}
        </Row>
      </Container>
    )
  }
}