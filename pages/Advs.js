import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST, {Container, SingleContainer} from '../Setting.js'
import List from './advs/_List.js'
import SearchComponent from '../componets/SearchComponent.js'

export default class BackendUser extends SearchComponent {
  url = '/api/advs/list'

  addEgc() {
    ST.history.push('/backend/advs/add/egc')
  }

  addLink() {
    ST.history.push('/backend/advs/add/link')
  }



  render() {
    return (
      <Container breadcrumb={[{name: '广告列表'}]}>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          <Button type="primary" htmlType="submit" onClick={this.addLink.bind(this)}>新增广告</Button>
        </Row>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          {this.makeList(List)}
        </Row>
      </Container>
    )
  }
}