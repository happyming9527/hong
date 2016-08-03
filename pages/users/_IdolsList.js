import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST, {SingleContainer} from '../../Setting.js'
import List from './_List.js'
import {Link} from 'react-router'
const Panel = Collapse.Panel;

export default class FansList extends React.Component {
  constructor(props) {
    super(props)
    debugger
    this.userId = this.props.params.id
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

  changeConditionAndSearch(json) {
    this.searchCondition = json;
    this.fetchData()
  }

  fetchData() {
    ST.httpPost(
      `/api/users/idols_list`, {userId: this.userId})
      .then(result=> {
        let dataSource = result.data.list.map(ele=> {
          ele.key = ele.userId.toString()
          return ele
        })
        this.setState({
          total: result.data.totalCount,
          loaded: true,
          dataSource: dataSource
        })
      })
      .catch(e=>ST.info.error(e.message)&&console.log(e.stack)).done
  }

  changeConditionAndSearch(json) {
    this.searchCondition = json;
    this.fetchData()
  }

  changePage(page) {
    this.currentPage = page
    this.fetchData()
  }

  render() {
    let that = this
    let breadcrumb = [
      {name: 'app用户列表', url: '/backend/users'},
      {name: '偶像列表'}
    ]
    return (
      <SingleContainer
        breadcrumb={breadcrumb}>
        <Row style={{marginTop: 20, marginBottom: 20}}>
          <List
            ref={i=>this.list=i}
            pageSize = {this.per}
            changePage={this.changePage.bind(this)}
            dataSource={this.state.dataSource}
            total={this.state.total} />
        </Row>
        <Row style={{marginTop: 20, marginBottom: 20}}>
          <Button type="ghost" onClick={ST.historyGoBack}>返回</Button>
        </Row>
      </SingleContainer>
    )
  }
}