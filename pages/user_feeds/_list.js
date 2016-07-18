"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm} from 'antd';
import ST from '../../Setting.js'

export default class BackendUser extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },{
      title: '是否私有',
      dataIndex: 'privateTypeDesc',
      key: 'privateTypeDesc',
    },{
      title: '用户id',
      dataIndex: 'userId',
      key: 'userId',
    },{
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },{
      title: '创建时间',
      dataIndex: 'createTimeDesc',
      key: 'createTimeDesc',
    },{
      title: '状态',
      dataIndex: 'opStateDesc',
      key: 'opStateDesc',
    },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => {
          let recButton
          if (record.opState==1) {
            recButton =
              [
                <Popconfirm key={'p1'} title={`确定要推荐这个微博吗`} onConfirm={this.rec.bind(this, record)}>
                  <a href="javascript:void(0)">推荐</a>
                </Popconfirm>,
                <span key={'p2'}  className="ant-divider"></span>,
                <Popconfirm key={'p3'}  title={`确定要置顶这个微博吗`} onConfirm={this.top.bind(this, record)}>
                  <a href="javascript:void(0)">置顶</a>
                </Popconfirm>
              ]
          } else if (record.opState==2) {
            recButton = [
              <Popconfirm  key={'p1'}  title={`确定要取消置顶这个微博吗`} onConfirm={this.cancelTop.bind(this, record)}>
                <a href="javascript:void(0)">取消置顶</a>
              </Popconfirm>
            ]

          } else if (record.opState==3) {
            recButton = [
              <Popconfirm  key={'p1'}  title={`确定要取消推荐这个微博吗`} onConfirm={this.cancelRec.bind(this, record)}>
                <a href="javascript:void(0)">取消推荐</a>
              </Popconfirm>
            ]
          }

          return <span>
            <a href="javascript:void(0)" onClick={this.showNode.bind(this, record)}>查看</a>
            <span className="ant-divider"></span>
            {recButton}
          </span>
        }}];
  }

  editNode(record) {
    ST.history.push(`/backend/user_feeds/edit/${record.id}`)
  }


  showNode(record) {
    ST.history.push(`/backend/user_feeds/show/${record.id}`)
  }

  rec(record) {
    ST.httpPost(
      `/api/user_feeds/rec?id=${record.id}`)
      .then(result=> {
        ST.historyReload('/backend/user_feeds')
        ST.info.success('推荐成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  cancelRec(record) {
    ST.httpPost(
      `/api/user_feeds/cancel_rec?id=${record.id}`)
      .then(result=> {
        ST.historyReload('/backend/user_feeds')
        ST.info.success('取消推荐成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  top(record) {
    ST.httpPost(
      `/api/user_feeds/top?id=${record.id}`)
      .then(result=> {
        ST.historyReload('/backend/user_feeds')
        ST.info.success('置顶成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  cancelTop(record) {
    ST.httpPost(`/api/user_feeds/cancel_top?id=${record.id}`)
      .then(result=> {
        ST.historyReload('/backend/user_feeds')
        ST.info.success('取消置顶成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {
    let that = this
    let paginationConfig = {
      showQuickJumper: true,
      total: this.props.total,
      pageSize: this.props.pageSize,
      showTotal: total =>`共 ${this.props.total} 条`,
      onChange(current) {
        that.props.changePage(current)
      },
    }

    return (
      <Table
        bordered={true}
        dataSource={this.props.dataSource}
        columns={this.columns}
        pagination={paginationConfig}/>
    )

  }
}