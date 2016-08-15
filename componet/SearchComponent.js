import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker,  Table, Breadcrumb, Card } from 'antd'
import ST from '../Setting.js'
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

  fetchData(url) {
    if (!url) {
      alert('您还没有正确复写fetchData方法.')
      return
    }
    ST.httpPost(
      url, this.state.searchParams)
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