import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST from '../Setting.js'
import List from './shake_tips/_List.js'
import {Link} from 'react-router'
import SearchComponent from '../componets/SearchComponent.js'

const Panel = Collapse.Panel;

export default class BackendUser extends SearchComponent {
  url = '/api/shake_tips/list'

  addEgc() {
    ST.history.push('/backend/shake_tips/add/egc')
  }

  addLink() {
    ST.history.push('/backend/shake_tips/add/link')
  }

  render() {
    let that = this
    return (
      <ST.Container breadcrumb={[{name: '摇一摇贴士列表'}]}>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          <Button type="primary" htmlType="submit" onClick={this.addEgc.bind(this)}>新增摇一摇贴士</Button>
        </Row>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          {this.makeList(List)}
        </Row>
      </ST.Container>
    )
  }
}