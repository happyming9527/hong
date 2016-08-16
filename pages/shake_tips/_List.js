"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm} from 'antd';
import ST from '../../Setting.js'
import {userCategory, shakeTipState} from '../../Locales.js'

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },{
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },{
      title: '阶段',
      dataIndex: 'userCategory',
      key: 'userCategory',
      render: (text, record) =>{
        let obj = userCategory.find(i=>i.key==text)
        if (obj) {
          return obj.value
        } else {
          return "未知"
        }
      }
    },{
      title: '状态',
      dataIndex: 'opState',
      key: 'opState',
      render: (text, record) =>{
        let obj = shakeTipState.find(i=>i.key==text)
        if (obj) {
          return obj.value
        } else {
          return "未知"
        }
      }
    },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => {
          let recButton
          if (record.opState==0) {
            recButton = <Popconfirm title={`确定要发布这个摇一摇便签吗`} onConfirm={this.publish.bind(this, record)}>
              <a href="javascript:void(0)">发布</a>
            </Popconfirm>
          } else if (record.opState==1) {
            recButton = <Popconfirm title={`确定要取消发布这个摇一摇便签吗`} onConfirm={this.cancelPublish.bind(this, record)}>
              <a href="javascript:void(0)">取消发布</a>
            </Popconfirm>
          }

          return <span>
            <a href="javascript:void(0)" onClick={this.editNode.bind(this, record)}>修改</a>
            <span className="ant-divider"></span>
            {recButton}
          </span>

        }}];
  }

  editNode(record) {
    ST.history.push(`/backend/shake_tips/edit/${record.id}`)
  }
  

  publish(record) {
    ST.httpPost(
      `/api/shake_tips/publish?id=${record.id}`)
      .then(result=> {
        ST.historyReload('/backend/shake_tips')
        ST.info.success('发布成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  cancelPublish(record) {
    ST.httpPost(
      `/api/shake_tips/cancel_publish?id=${record.id}`)
      .then(result=> {
        ST.historyReload('/backend/shake_tips')
        ST.info.success('取消发布成功')
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