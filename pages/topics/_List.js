"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm} from 'antd';
import ST from '../../Setting.js'
import ListComponent from '../../componets/ListComponent.js'

export default class List extends ListComponent {
    columns = [{
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
            recButton = <Popconfirm title={`确定要发布这个话题吗`} onConfirm={this.publish.bind(this, record)}>
              <a href="javascript:void(0)">发布</a>
            </Popconfirm>
          } else if (record.opState==1) {
            recButton = <Popconfirm title={`确定要取消发布这个话题吗`} onConfirm={this.cancelPublish.bind(this, record)}>
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

  editNode(record) {
    ST.history.push(`/backend/topics/edit/${record.id}`)
  }

  showNode(record) {
    ST.history.push(`/backend/topics/show/${record.id}`)
  }

  publish(record) {
    ST.httpPost(
      `/api/topics/publish?id=${record.id}`)
      .then(result=> {
        ST.historyReload('/backend/topics')
        ST.info.success('发布成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  cancelPublish(record) {
    ST.httpPost(
      `/api/topics/cancel_publish?id=${record.id}`)
      .then(result=> {
        ST.historyReload('/backend/topics')
        ST.info.success('取消发布成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }
}