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
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },{
      title: '类型',
      dataIndex: 'kind',
      key: 'kind',
    },{
      title: '是否发布',
      dataIndex: 'published_desc',
      key: 'published_desc',
    },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => {
          let publishText = record.is_published ? '取消发布':'发布'
          let stickText = record.is_stick ? '取消置顶':'置顶'
          return <span>
            <a href="javascript:void(0)" onClick={this.editNode.bind(this, record)}>修改</a>
            <span className="ant-divider"></span>
            <Popconfirm title={`确定要${publishText}这个文章吗`} onConfirm={this.changePublishState.bind(this, record)}>
              <a href="javascript:void(0)">{publishText}</a>
            </Popconfirm>
            <span className="ant-divider"></span>
            <Popconfirm title={`确定要${stickText}这个文章吗`} onConfirm={this.changeStickState.bind(this, record)}>
              <a href="javascript:void(0)">{stickText}</a>
            </Popconfirm>
          </span>
        }}];
  }

  editNode(record) {
    ST.history.push(`/backend/articles/edit/${record.id}`)
  }

  changePublishState(record) {
    ST.httpPost(
      `/api/articles/toggle_published?id=${record.id}`)
      .then(result=> {
        ST.historyReload('/backend/articles')
        ST.info.success(result.text)
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  changeStickState(record) {
    ST.httpPost(
      `/api/articles/toggle_stick?id=${record.id}`)
      .then(result=> {
        ST.historyReload('/backend/articles')
        ST.info.success(result.text)
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