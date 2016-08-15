import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker,Table, Breadcrumb, Card } from 'antd'
import {SingleContainer, SearchFormContainer} from '../Setting.js'
import List from './user_feeds/_List.js'
import SearchForm from './user_feeds/_SearchForm.js'
import SearchComponent from '../componets/SearchComponent.js'

export default class UserFeeds extends SearchComponent {

  fetchData() {
    super.fetchData(`/api/user_feeds/list`);
  }

  render() {
    let that = this
    let breadcrumb = [{name: '用户微博管理'}]
    let header = (
      <SearchFormContainer>
        <SearchForm
          searchParams={this.state.searchParams}
          searchCallback={this.changeConditionAndSearch} />
      </SearchFormContainer>
    )
    return (
      <SingleContainer breadcrumb={breadcrumb} header={header} key="UserFeeds">
        <List
          ref={i=>this.list=i}
          currentPage = {this.state.searchParams.currentPage}
          pageSize = {parseInt(this.state.searchParams.pageSize)}
          changePage={this.changePage}
          dataSource={this.state.dataSource}
          total={parseInt(this.state.total)} />
      </SingleContainer>
    )
  }
}
