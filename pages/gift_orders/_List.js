"use strict"
import React from 'react'
import {render} from 'react-dom'
import 'antd/dist/antd.css';
import {Button, Form, Input, Table, Popconfirm} from 'antd';
import ST from '../../Setting.js'
import {giftOrderStatus} from '../../Locales.js'
import ListComponent from '../../componets/ListComponent.js'

export default class List extends ListComponent {

  columns = [{
    title: '订单id',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '礼品id',
    dataIndex: 'giftId',
    key: 'giftId',
  }, {
    title: '用户id',
    dataIndex: 'userId',
    key: 'userId',
  }, {
    title: '礼物名称',
    dataIndex: 'giftName',
    key: 'giftName',
  }, {
    title: '申请用户名',
    dataIndex: 'userName',
    key: 'userName'
  }, {
    title: '订单状态',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    render: (text, record)=> {
      let obj = giftOrderStatus.find(i=>i.key == text)
      return obj ? obj.value : '未知'
    }
  }, {
    title: '收件人名称',
    dataIndex: 'accepterName',
    key: 'accepterName'
  }, {
    title: '收件人电话',
    dataIndex: 'accepterMobile',
    key: 'accepterMobile',
  }, {
    title: '收件人地址',
    dataIndex: 'accepterAddress',
    key: 'accepterAddress',
  },
    {
      title: '操作',
      key: 'operation',
      render: this.actionButtons.bind(this)
    }
  ]

  actionButtons(text, record) {
    let recButton
    if (record.orderStatus == 1) {
      recButton =
        [
          <Popconfirm key={'p1'} title={`确定要拒绝这个订单吗`} onConfirm={this.reject.bind(this, record)}>
            <a href="javascript:void(0)">审核拒绝</a>
          </Popconfirm>,
          <span key={'p2'} className="ant-divider"></span>,
          <Popconfirm key={'p3'} title={`确定要同意这个订单吗`} onConfirm={this.approve.bind(this, record)}>
            <a href="javascript:void(0)">审核同意</a>
          </Popconfirm>
        ]
    } else if (record.orderStatus == 3) {
      recButton = [<a href="javascript:void(0)" key={'p1'} onClick={this.sendNode.bind(this, record)}>发货</a>]

    }

    return <span>
      <a href="javascript:void(0)" onClick={this.showNode.bind(this, record)}>查看</a>
      {
        !recButton ? null : [
          <span className="ant-divider"></span>,
          recButton
        ]
      }
    </span>
  }

  showNode(record) {
    ST.history.push(`/backend/gift_orders/show/${record.id}`)
  }

  sendNode(record) {
    ST.history.push(`/backend/gift_orders/send/${record.id}`)
  }

  approve(record) {
    ST.httpPost(`/api/gift_orders/approve/${record.id}`)
      .then(result=> {
        ST.historyReload('/backend/gift_orders')
        ST.info.success('操作成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  reject(record) {
    ST.httpPost(`/api/gift_orders/reject/${record.id}`)
      .then(result=> {
        ST.historyReload('/backend/gift_orders')
        ST.info.success('操作成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }
}