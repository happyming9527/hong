import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST from '../Setting.js'
import SearchForm from './backend_users/SearchForm.js'
import List from './backend_users/List.js'
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
    this.per = 11
    this.currentPage = 1

  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    fetch(`/api/foo/backend_users?page=${this.currentPage}&per=${this.per}`, {
      method: 'post',
      credentials: 'include',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(this.searchCondition),
    }).then(e=>e.json())
      .then(result=> {
        if (result.code && result.code == 1) {
          let dataSource = result.data.data.map(ele=> {
            ele.key = ele.id.toString()
            return ele
          })
          this.setState({
            total: result.data.size,
            loaded: true,
            dataSource: dataSource
          })
        } else {
          ST.info.error(result.text)
        }
      }).catch(e=> {
      console.log(e.stack)
      ST.info.error(e.message)
    })
  }

  changeConditionAndSearch(json) {
    this.searchCondition = json;
    this.fetchData()
  }

  changePage(page) {
    debugger
    this.currentPage = page
    this.fetchData()
  }

  render() {
    let that = this
    return (
      !this.state.loaded ? ST.loading() :
        <div style={{width: '100%', padding: '20px 30px'}}>

          <Row>
            <Breadcrumb separator=">">
              <Breadcrumb.Item><Link to="/backend">首页</Link></Breadcrumb.Item>
              <Breadcrumb.Item>后台用户列表</Breadcrumb.Item>
            </Breadcrumb>
          </Row>

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
            <Card style={{ width: '100%' }}>
              <List
                ref={i=>this.list=i}
                pageSize = {this.per}
                changePage={this.changePage.bind(this)}
                dataSource={this.state.dataSource}
                total={this.state.total} />
            </Card>
          </Row>
        </div>
    )
  }
}