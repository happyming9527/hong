"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm, Row} from 'antd';
import ST, {SingleContainer} from '../../Setting.js'
import VerticalList from './_VerticalList.js'

export default class CommentsList extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.params.id
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
      `/api/user_feeds/comments?id=${this.id}`, {q: this.searchCondition})
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
      .catch(e=>ST.info.error(e.message)&&console.log(e.stack)).done
  }

  actionButtons(text, record) {
    return <span>
            <a href="javascript:void(0)">点赞</a>
          </span>
  }

  render() {
    let that = this
    let paginationConfig = {
      showQuickJumper: true,
      total: this.state.total,
      pageSize: 10000,
      showTotal: total =>`共 ${this.state.total} 条`,
      onChange(current) {
        that.props.changePage(current)
      },
    }

    return (
      <SingleContainer breadcrumb={[{name: '用户feed举报管理', url: '/backend/user_feeds'}, {name: '评论列表'}]}  key="CommentsList" >
        <Row style={{marginTop: 20, marginBottom: 20}}>
          <VerticalList dataSource={this.state.dataSource} pagination={paginationConfig} actionButtons={this.actionButtons.bind(this)} />
        </Row>
        <Row style={{marginTop: 20, marginBottom: 20}}>
          <Button type="ghost" onClick={ST.historyGoBack}>返回</Button>
        </Row>
      </SingleContainer>
    )

  }
}