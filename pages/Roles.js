import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST, {Container, SingleContainer} from '../Setting.js'
import List from './roles/_List.js'
import {Link} from 'react-router'
const Panel = Collapse.Panel;
import SearchComponent from '../componets/SearchComponent.js'

export default class BackendUser extends SearchComponent {
  url = '/api/roles/list'

  addFunc() {
    ST.history.push('/backend/roles/add')
  }
  fetchData() {
    ST.httpPost(this.url, this.state.searchParams)
      .then(result=> {
        let dataSource = result.data.data.map(ele=> {
          ele.key = ele[this.keyName].toString()
          return ele
        })
        this.setState({
          total: result.data.totalCount,
          loaded: true,
          dataSource: dataSource
        })
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    let that = this
    return (
      <Container breadcrumb={[{name: '后台角色管理'}]}>
        <Row style={{marginTop: 20, marginBottom: 20}}>
          <Button type="primary" htmlType="submit" onClick={this.addFunc.bind(this)}>新增</Button>
        </Row>

        {this.makeList(List)}
      </Container>
    )
  }
}