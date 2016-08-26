"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm, Row, Pagination} from 'antd';
import ST from '../../Setting.js'
import ListComponent from '../../componets/ListComponent.js'
import {giftState} from '../../Locales.js'
export default class List extends ListComponent {

  columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },{
    title: '名称',
    dataIndex: 'title',
    key: 'title',
  },{
    title: 'logo',
    dataIndex: 'logo',
    key: 'logo',
    render: (text, record)=>{
      return <img src={record.logo} alt="" style={{width: '50px', height: '50px'}}/>
    }
  },{
    title: '积分',
    dataIndex: 'score',
    key: 'score',
  },{
    title: '数量',
    dataIndex: 'count',
    key: 'count',
  },{
    title: '剩余数量',
    dataIndex: 'remain',
    key: 'remain',
  },{
    title: '排序因子',
    dataIndex: 'orderNum',
    key: 'orderNum',
  },{
    title: '状态',
    dataIndex: 'display',
    key: 'display',
    render(text,record) {
      return giftState.fetch(text)||'未知'
    }
  },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {
        let recButton = [
          <a href="javascript:void(0)" onClick={this.showNode.bind(this, record)}>查看</a>,
          <a href="javascript:void(0)" onClick={this.myOrders.bind(this, record)}>订单</a>,
          <a href="javascript:void(0)" onClick={this.editNode.bind(this, record)}>修改</a>
        ]
        return <span> {ST.opSeparate(recButton)} </span>


      }
    }
  ];

  myOrders(record) {
    ST.history.push(`/backend/gifts/my_gift_orders/${record.id}?pageSize=100000&currentPage=1&giftId=${record.id}`)
  }

  editNode(record) {
    ST.history.push(`/backend/gifts/edit/${record.id}`)
  }

  showNode(record) {
    ST.history.push(`/backend/gifts/show/${record.id}`)
  }

}