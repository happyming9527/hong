import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST, {Container, SingleContainer} from '../Setting.js'
import List from './articles/_List.js'
import {Link} from 'react-router'
const Panel = Collapse.Panel;
import SearchComponent from '../componets/SearchComponent.js'

export default class BackendUser extends SearchComponent {

  url = '/api/articles/list'

  addEgc() {
    ST.history.push('/backend/articles/add/egc')
  }

  addLink() {
    ST.history.push('/backend/articles/add/link')
  }

  render() {
    let that = this
    return (
      <Container breadcrumb={[{name: '文章列表'}]}>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          <Button type="primary" htmlType="submit" onClick={this.addEgc.bind(this)}>新增文章</Button>
          <Button type="primary" htmlType="submit" onClick={this.addLink.bind(this)} style={{marginLeft: 10}}>新增外链</Button>
        </Row>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          {this.makeList(List)}
        </Row>
      </Container>
    )
  }
}