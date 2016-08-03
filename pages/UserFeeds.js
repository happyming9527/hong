import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST, {SingleContainer, SearchFormContainer} from '../Setting.js'
import List from './user_feeds/_List.js'
import {Link} from 'react-router'
import SearchForm from './user_feeds/_SearchForm.js'
const queryString = require('query-string');

export default class UserFeeds extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.initValue()
    this.fetchData()
  }

  initValue() {
    let searchParams = queryString.parse(location.search);
    if (ST.isEmpty(searchParams)) {
      searchParams = {
        pageSize: 10,
        currentPage: 1
      }
    }

    this.state = {
      dataSource: [],
      total: 0,
      searchParams: searchParams
    }
  }

  fetchData() {
    ST.httpPost(
      `/api/user_feeds/list`, this.state.searchParams)
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

  research() {
    ST.historyReload('/backend/user_feeds?'+queryString.stringify(this.state.searchParams))
    this.fetchData()
  }

  changeConditionAndSearch(json) {
    let params = {...this.state.searchParams, ...json, currentPage: 1}
    this.setState({
      searchParams: params
    }, this.research)
  }

  changePage(page) {
    let params = {...this.state.searchParams, currentPage: page}
    this.setState({
      searchParams: params
    }, this.research)

  }

  render() {
    let that = this
    let breadcrumb = [{name: '用户微博管理'}]
    let header = (
      <SearchFormContainer>
        <SearchForm
          ref={i=>this.searchForm=i}
          searchParams={this.state.searchParams}
          searchCallback={this.changeConditionAndSearch.bind(this)} />
      </SearchFormContainer>
    )
    return (
      <SingleContainer breadcrumb={breadcrumb} header={header} key="UserFeeds">
        <List
          ref={i=>this.list=i}
          currentPage = {this.state.searchParams.currentPage}
          pageSize = {parseInt(this.state.searchParams.pageSize)}
          changePage={this.changePage.bind(this)}
          dataSource={this.state.dataSource}
          total={parseInt(this.state.total)} />
      </SingleContainer>
    )
  }
}
