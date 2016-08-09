"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm, Row, Pagination} from 'antd';
import ST from '../../Setting.js'
import VerticalList from './_VerticalList.js'
import {ReportedFeedState} from '../../Locales.js'

export default class BackendUser extends React.Component {
  constructor(props) {
    super(props)
  }

  actionButtons(record) {
    let recButton
    recButton = [
      <a href="javascript:void(0)"
         onClick={this.showComments.bind(this, record)}>查看评论({record.commentCount || 0})</a>
    ]

    let that = this
    if (record.reportState==50) {
      ReportedFeedState.slice(1,ReportedFeedState.length).forEach((i, index)=> {
        recButton.push(
          <Popconfirm key={`p${index}`} title={`确定要${i.value}吗`} onConfirm={that.resolveReport.bind(that, record, i.key)}>
            <a href="javascript:void(0)"> {i.value} </a>
          </Popconfirm>
        )
      })

    }

    return <span> {ST.opSeparate(recButton)} </span>
  }

  resolveReport(record, key) {
    ST.fetchPost(
      result=>ST.successReload('处理成功'),
      `/api/reported_feeds/resolve_report?id=${record.id}&kind=${key}`
    )
  }


  showNode(record) {
    ST.history.push(`/backend/reported_feeds/show/${record.id}`)
  }

  showComments(record) {
    ST.history.push(`/backend/reported_feeds/comments/${record.id}`)
  }

  render() {
    let that = this
    return (
      <div>
        <Row>
          <VerticalList
            dataSource={this.props.dataSource}
            actionButtons={this.actionButtons.bind(this)} />
          <Pagination
            showQuickJumper
            total={this.props.total}
            current={parseInt(this.props.currentPage)}
            pageSize={parseInt(this.props.pageSize)}
            showTotal={
              total=>`共 ${parseInt(this.props.total)} 条`
            }
            onChange={
              current=>{
                that.props.changePage(current)
              }
            }
          />
        </Row>
      </div>
    )

  }
}