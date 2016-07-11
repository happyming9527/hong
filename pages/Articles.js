import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST from '../Setting.js'
import List from './articles/_List.js'
import {Link} from 'react-router'
const Panel = Collapse.Panel;

export default class BackendUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      total: 0,
    }
    this.searchCondition = {}
    this.per = 10
    this.currentPage = 1

  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    ST.httpPost(
      `/api/articles/list?page=${this.currentPage}&per=${this.per}`, {q: this.searchCondition})
      .then(result=> {
        let dataSource = result.data.data.map(ele=> {
          ele.key = ele.id.toString()
          return ele
        })
        this.setState({
          total: result.data.size,
          loaded: true,
          dataSource: dataSource
        })
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  changeConditionAndSearch(json) {
    this.searchCondition = json;
    this.fetchData()
  }

  changePage(page) {
    this.currentPage = page
    this.fetchData()
  }

  addFunc() {
    ST.history.push('/backend/articles/add')
  }

  render() {
    let that = this
    return (
      <ST.Container breadcrumb={[{name: '文章列表'}]}>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          <Button type="primary" htmlType="submit" onClick={this.addFunc.bind(this)}>新增</Button>
        </Row>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          <List
            ref={i=>this.list=i}
            pageSize = {this.per}
            changePage={this.changePage.bind(this)}
            dataSource={this.state.dataSource}
            total={this.state.total} />
        </Row>
      </ST.Container>
    )
  }
}