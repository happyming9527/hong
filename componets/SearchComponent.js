import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker,  Table, Breadcrumb, Card } from 'antd'
import ST, {Controller, SingleContainer, SearchFormContainer, MiniContainer} from '../Setting.js'

const queryString = require('query-string');

export default class SearchComponent extends React.Component {
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

  makeHeader=(Clazz) =>{
    if (Clazz == null) {
      return null
    }
    return (
      <SearchFormContainer>
        <Clazz
          searchParams={this.state.searchParams}
          searchCallback={this.changeConditionAndSearch} />
      </SearchFormContainer>
    )
  }

  makeList = (Clazz)=>{
    return (
      <Clazz
        currentPage = {this.state.searchParams.currentPage}
        pageSize = {parseInt(this.state.searchParams.pageSize)}
        changePage={this.changePage}
        dataSource={this.state.dataSource}
        total={parseInt(this.state.total)} />
    )
  }

  makeRender = (breadcrumb, searchForm, list, canBack)=> {
    return <SingleContainer back={canBack} breadcrumb={breadcrumb} header={this.makeHeader(searchForm)}>
      {this.makeList(list)}
    </SingleContainer>
  }

  makeMiniRender = (breadcrumb, searchForm, list, canBack)=>{
    return <MiniContainer back={canBack} breadcrumb={breadcrumb} header={this.makeHeader(searchForm)}>
      {this.makeList(list)}
    </MiniContainer>
  }

  url = null
  keyName = 'id'
  fetchData() {
    if (!this.url) {
      alert('您还没有设置url.')
      return
    }
    ST.httpPost(this.url, this.state.searchParams)
      .then(result=> {
        debugger
        let dataSource = result.data.list.map(ele=> {
          ele.key = ele[this.keyName].toString()
          return ele
        })
        this.setState({
          total: result.data.totalCount,
          loaded: true,
          dataSource: dataSource
        })
      })
      .catch(e=>{ST.info.error(e.message) && console.log(e.stack)}).done
  }

  research() {
    ST.historyReload(window.location.pathname + '?' + queryString.stringify(this.state.searchParams))
    this.fetchData()
  }

  changeConditionAndSearch = (json)=> {
    let params = {...this.state.searchParams, ...json, currentPage: 1}
    this.setState({
      searchParams: params
    }, this.research)
  }

  changePage = (page)=>{
    let params = {...this.state.searchParams, currentPage: page}
    this.setState({
      searchParams: params
    }, this.research)

  }
}