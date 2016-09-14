"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm} from 'antd';
import ST from '../../Setting.js'
import ListComponent from '../../componets/ListComponent.js'
import {topicState, topicType} from '../../Locales.js'

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
      title: '种类',
      dataIndextype: 'type',
      key: 'type',
      render(text,record) {
        return topicType.fetch(record.type)||'未知'
      }
    },{
      title: '状态',
      dataIndex: 'opState',
      key: 'opState',
      render(text,record) {
        return topicState.fetch(record.opState)||'未知'
      }
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
          }  else if (record.opState==1) {
            recButton =
              [<Popconfirm title={`确定要取消发布这个话题吗`} onConfirm={this.cancelPublish.bind(this, record)}>
                <a href="javascript:void(0)">取消发布</a>
              </Popconfirm>,
                <span className="ant-divider"></span>,
                <a href="javascript:void(0)" onClick={this.top.bind(this, record)}>置顶</a>
              ]

          } else if (record.opState==2) {
            recButton = [
              <Popconfirm title={`确定要取消置顶这个文章吗`} onConfirm={this.cancelTop.bind(this, record)}>
                <a href="javascript:void(0)">取消置顶</a>
              </Popconfirm>
            ]

          }

          return <span>
            <a href="javascript:void(0)" onClick={this.showNode.bind(this, record)}>查看</a>
            <span className="ant-divider"></span>
            <a href="javascript:void(0)" onClick={this.allFeeds.bind(this, record)}>相关记录</a>
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

  allFeeds(record) {
    ST.history.push(`/backend/topics/all_feeds/${record.id}`)
  }

  publish(record) {
    ST.httpPost(
      `/api/topics/publish?id=${record.id}`)
      .then(result=> {
        ST.successReload('发布成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  cancelPublish(record) {
    ST.httpPost(
      `/api/topics/cancel_publish?id=${record.id}`)
      .then(result=> {
        ST.successReload('取消发布成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  top(record) {
    ST.history.push(`/backend/topics/top/${record.id}`)
  }

  cancelTop(record) {
    ST.httpPost(`/api/articles/cancel_top?id=${record.id}`)
      .then(result=> {
        ST.successReload('取消置顶成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }
}