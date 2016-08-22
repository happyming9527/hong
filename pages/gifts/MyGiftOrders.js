import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker,Table, Breadcrumb, Card, Row } from 'antd'
import ST, {SingleContainer, SearchFormContainer, Container} from '../../Setting.js'
import List from '../gift_orders/_List.js'
import SearchComponent from '../../componets/SearchComponent.js'
import GiftOrderSearchForm from './_GiftOrderSearchForm.js'

export default class UserFeeds extends SearchComponent {

  url = `/api/gift_orders/list`

  importExpress = ()=>{
    ST.history.push(`backend/gifts/import_express_no/${this.props.params.id}`)
  }

  render() {
    let breadcrumb = [{name: '礼物管理', url: '/backend/gifts'}, {name: '礼品订单'}]

    return (
      <Container breadcrumb={[{name: '礼品列表'}]}>
        {this.makeHeader(GiftOrderSearchForm)}

        <Row style={{marginTop: 20, marginBottom: 20}}>
          <Button type="primary" htmlType="submit" onClick={this.importExpress}>导入邮单</Button>
        </Row>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          {this.makeList(List)}
        </Row>
      </Container>
    )
  }
}
