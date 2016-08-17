"use strict"
import React from 'react'
import {render} from 'react-dom'
import 'antd/dist/antd.css';
import {Button, Form, Input, Table, Popconfirm, Row, Pagination} from 'antd';
import ST from '../../Setting.js'
import VerticalList from './_VerticalList.js'
import {userFeedPrivateState, opState} from '../../Locales.js'
export default class BackendUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vertical: true
    }
  }

  actionButtons(text, record) {
    let recButton
    if (record.opState == 1) {
      recButton =
        [
          <a href="javascript:void(0)" onClick={this.rec.bind(this, record)}>推荐</a>,
          <span key={'p2'} className="ant-divider"></span>,
          <a href="javascript:void(0)" onClick={this.top.bind(this, record)}>置顶</a>
        ]
    } else if (record.opState == 2) {
      recButton = [
        <Popconfirm key={'p1'} title={`确定要取消置顶这个微博吗`} onConfirm={this.cancelTop.bind(this, record)}>
          <a href="javascript:void(0)">取消置顶</a>
        </Popconfirm>
      ]

    } else if (record.opState == 3) {
      recButton = [
        <Popconfirm key={'p1'} title={`确定要取消推荐这个微博吗`} onConfirm={this.cancelRec.bind(this, record)}>
          <a href="javascript:void(0)">取消推荐</a>
        </Popconfirm>
      ]
    }

    return <span>
            <a href="javascript:void(0)"
               onClick={this.showComments.bind(this, record)}>查看评论({record.commentCount || 0})</a>
            <span className="ant-divider"></span>
       <a href="javascript:void(0)" onClick={this.report.bind(this, record)}>举报</a>
                  <span className="ant-divider"></span>
      {recButton}
          </span>
  }

  editNode(record) {
    ST.history.push(`/backend/user_feeds/edit/${record.id}`)
  }


  showNode(record) {
    ST.history.push(`/backend/user_feeds/show/${record.id}`)
  }

  showComments(record) {
    ST.history.push(`/backend/user_feeds/comments/${record.id}`)
  }

  rec(record) {
    ST.history.push(`/backend/user_feeds/rec/${record.id}`)
  }

  cancelRec(record) {
    ST.httpPost(
      `/api/user_feeds/cancel_rec?id=${record.id}`)
      .then(result=> {
        ST.successReload('取消推荐成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  top(record) {
    ST.history.push(`/backend/user_feeds/top/${record.id}`)
  }

  cancelTop(record) {
    ST.httpPost(`/api/user_feeds/cancel_top?id=${record.id}`)
      .then(result=> {
        ST.successReload('取消置顶成功')
      })
      .catch(e=>ST.info.error(e.message) && console.log(e.stack)).done
  }

  report(record) {
    ST.httpPost(`/api/user_feeds/report?id=${record.id}`)
      .then(result=> {
        ST.successReload('举报成功')
      })
      .catch(e=>ST.info.error(e.message) && console.log(e.stack)).done
  }

  setVertical() {
    this.setState({
      vertical: true
    })
  }

  cancelVertical() {
    this.setState({
      vertical: false
    })
  }

  render() {
    let that = this
    let table = <VerticalList dataSource={this.props.dataSource} actionButtons={this.actionButtons.bind(this)}/>
    return (
      <div>
        <Row>
          {table}
          <Pagination
            showQuickJumper
            total={this.props.total}
            current={parseInt(this.props.currentPage)}
            pageSize={parseInt(this.props.pageSize)}
            showTotal={
              total=>`共 ${parseInt(this.props.total)} 条`
            }
            onChange={
              current=> {
                that.props.changePage(current)
              }
            }
          />
        </Row>
      </div>
    )

  }
}