"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table } from 'antd';

export default class BackendUser extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },{
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '真名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span>
          <a href="#">操作一{record.name}</a>
          <span className="ant-divider"></span>
          <a href="#">操作二</a>
        </span>
      )}];
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