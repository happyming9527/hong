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
    title: '状态',
    dataIndex: 'hide',
    key: 'hide',
    render(text,record) {
      return giftState.fetch(text)||'未知'
    }
  },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => {

        return <span>
            <a href="javascript:void(0)" onClick={this.showNode.bind(this, record)}>查看</a>
            <span className="ant-divider"></span>
            <a href="javascript:void(0)" onClick={this.editNode.bind(this, record)}>修改</a>
          </span>

      }
    }
  ];

  editNode(record) {
    ST.history.push(`/backend/gifts/edit/${record.id}`)
  }

  showNode(record) {
    ST.history.push(`/backend/gifts/show/${record.id}`)
  }

}