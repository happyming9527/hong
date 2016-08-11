import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST from '../Setting.js'
import List from './blacklist/_List.js'
import {Link} from 'react-router'
import SearchForm from './blacklist/_SearchForm.js'
const Panel = Collapse.Panel;

export default class BackendUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      total: 0,
    }
    this.searchCondition = {}
    this.per = 20
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
      `/api/blacklist/list?page=${this.currentPage}&per=${this.per}`, {q: this.searchCondition})
      .then(result=> {
        let dataSource = result.data.list.map(ele=> {
          ele.key = ele.id.toString()
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
    return (
      <ST.Container breadcrumb={[{name: '黑名单列表'}]}>
        <Row>
          <Collapse accordion>
            <Panel header={'搜索框'} key="1">
              <SearchForm
                ref={i=>this.searchForm=i}
                searchCallback={this.changeConditionAndSearch.bind(this)} />
            </Panel>
          </Collapse>
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