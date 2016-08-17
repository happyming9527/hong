import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST, {Container, SingleContainer} from '../Setting.js'
import SearchForm from './backend_users/_SearchForm.js'
import List from './backend_users/_List.js'
import {Link} from 'react-router'
const Panel = Collapse.Panel;
import SearchComponent from '../componets/SearchComponent.js'

export default class BackendUser extends SearchComponent {
  url = '/api/backend_users/list'

  addFunc() {
    ST.history.push('/backend/backend_users/add')
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
      <Container breadcrumb={[{name: '后台用户列表'}]}>
        <Row style={{marginTop: 20, marginBottom: 20}}>
          <Button type="primary" htmlType="submit" onClick={this.addFunc.bind(this)}>新增</Button>
        </Row>

        {this.makeList(List)}
      </Container>
    )
  }
}