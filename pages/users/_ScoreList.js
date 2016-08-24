"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm} from 'antd';
import ST from '../../Setting.js'
import ListComponent from '../../componets/ListComponent.js'

export default class List extends ListComponent {
  constructor(props) {
    super(props)
    this.columns = [{
      title: '积分数',
      dataIndex: 'score',
      key: 'score',
    },{
      title: '成长值',
      dataIndex: 'growValue',
      key: 'growValue'
    },{
      title: '原因',
      dataIndex: 'categoryTitle',
      key: 'categoryTitle'
    },{
      title: '原因id',
      dataIndex: 'growCategory',
      key: 'growCategory'
    },{
      title: '创建时间',
      dataIndex: 'addTimeNice',
      key: 'addTimeNice'
    }
    ];
  }

}