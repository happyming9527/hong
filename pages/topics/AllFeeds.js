import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST, {Container, SingleContainer} from '../../Setting.js'
import List from './AllFeedsList.js'
import {Link} from 'react-router'
const Panel = Collapse.Panel;
import SearchComponent from '../../componets/SearchComponent.js'

export default class BackendUser extends SearchComponent {
  url = `/api/topics/all_feeds/${this.props.params.id}`

  render() {
    let that = this
    return (
      <Container breadcrumb={[{name: '话题feed列表'}]}>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          {this.makeList(List)}
        </Row>
      </Container>
    )
  }
}