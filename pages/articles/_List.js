"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm} from 'antd';
import ST from '../../Setting.js'
import ListComponent from '../../componets/ListComponent.js'
import {opState, feedType} from '../../Locales.js'
export default class BackendUser extends ListComponent {

    columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },{
      title: '类型',
      dataIndex: 'feedType',
      key: 'feedType',
      render(text, record) {
        return feedType.fetch(text)||'未知'
      }
    },{
      title: '状态',
      dataIndex: 'opState',
      key: 'opState',
      render(text, record) {
        return opState.fetch(text)||'未知'
      }
    },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => {
          let recButton
          if (record.opState==0) {
            recButton = <Popconfirm title={`确定要发布这个文章吗`} onConfirm={this.publish.bind(this, record)}>
              <a href="javascript:void(0)">发布</a>
            </Popconfirm>
          } else if (record.opState==1) {
            recButton =
              [<Popconfirm title={`确定要取消发布这个文章吗`} onConfirm={this.cancelPublish.bind(this, record)}>
                <a href="javascript:void(0)">取消发布</a>
              </Popconfirm>,
              <span className="ant-divider"></span>,
                <a href="javascript:void(0)" onClick={this.rec.bind(this, record)}>推荐</a>,
              <span className="ant-divider"></span>,
                <a href="javascript:void(0)" onClick={this.top.bind(this, record)}>置顶</a>
            ]

          } else if (record.opState==2) {
            recButton = [
              <Popconfirm title={`确定要取消置顶这个文章吗`} onConfirm={this.cancelTop.bind(this, record)}>
                <a href="javascript:void(0)">取消置顶</a>
              </Popconfirm>
            ]

          } else if (record.opState==3) {
            recButton = [
              <Popconfirm title={`确定要取消推荐这个文章吗`} onConfirm={this.cancelRec.bind(this, record)}>
                <a href="javascript:void(0)">取消推荐</a>
              </Popconfirm>
              ]
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
    ST.history.push(`/backend/articles/edit/${record.id}`)
  }

  showNode(record) {
    ST.history.push(`/backend/articles/show/${record.id}`)
  }

  publish(record) {
    ST.httpPost(
      `/api/articles/publish?id=${record.id}`)
      .then(result=> {
        ST.successReload('发布成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  cancelPublish(record) {
    ST.httpPost(
      `/api/articles/cancel_publish?id=${record.id}`)
      .then(result=> {
        ST.successReload('取消发布成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  rec(record) {
    ST.history.push(`/backend/articles/rec/${record.id}`)
  }

  cancelRec(record) {
    ST.httpPost(
      `/api/articles/cancel_rec?id=${record.id}`)
      .then(result=> {
        ST.successReload('取消推荐成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  top(record) {
    ST.history.push(`/backend/articles/top/${record.id}`)
  }

  cancelTop(record) {
    ST.httpPost(`/api/articles/cancel_top?id=${record.id}`)
      .then(result=> {
        ST.successReload('取消置顶成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

}