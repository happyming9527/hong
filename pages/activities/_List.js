"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm} from 'antd';
import ST from '../../Setting.js'

export default class List extends React.Component {
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
      title: '状态',
      dataIndex: 'opStateDesc',
      key: 'opStateDesc',
    },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => {
          let recButton
          if (record.opState==0) {
            recButton = <Popconfirm title={`确定要发布这个活动吗`} onConfirm={this.publish.bind(this, record)}>
              <a href="javascript:void(0)">发布</a>
            </Popconfirm>
          } else if (record.opState==1) {
            recButton = <Popconfirm title={`确定要取消发布这个活动吗`} onConfirm={this.cancelPublish.bind(this, record)}>
              <a href="javascript:void(0)">取消发布</a>
            </Popconfirm>
          }

          return <span>
            <a href="javascript:void(0)" onClick={this.showNode.bind(this, record)}>查看</a>
            <span className="ant-divider"></span>
            <a href="javascript:void(0)" onClick={this.editNode.bind(this, record)}>修改</a>
            <span className="ant-divider"></span>
            {recButton}
          </span>

              }}];
  }

  editNode(record) {
    ST.history.push(`/backend/activities/edit/${record.id}`)
  }

  showNode(record) {
    ST.history.push(`/backend/activities/show/${record.id}`)
  }

  publish(record) {
    ST.httpPost(
      `/api/activities/publish?id=${record.id}`)
      .then(result=> {
        ST.successReload('发布成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  cancelPublish(record) {
    ST.httpPost(
      `/api/activities/cancel_publish?id=${record.id}`)
      .then(result=> {
        ST.successReload('取消发布成功')
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