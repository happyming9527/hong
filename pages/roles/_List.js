"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table } from 'antd';
import ST from '../../Setting.js'

export default class BackendUser extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },{
      title: '名称',
      dataIndex: 'name',
      key: 'username',
    },
      {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span>
          <a href="javascript:void(0)" onClick={this.editNode.bind(this, record)}>修改</a>
          <span className="ant-divider"></span>
          <a href="javascript:void(0)" onClick={this.editNodeMenus.bind(this, record)}>添加菜单</a>
        </span>
      )}];
  }

  editNode(record) {
    ST.history.push(`/backend/roles/edit?id=${record.id}&name=${record.name}`)
  }

  editNodeMenus(record) {
    ST.history.push(`/backend/roles/edit_menus?id=${record.id}&name=${record.name}`)
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