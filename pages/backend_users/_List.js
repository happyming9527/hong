"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table } from 'antd';
import ST from '../../Setting.js'

export default class BackendUser extends React.Component {
  columns = [{
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
          <a href="javascript:void(0)" onClick={this.editNode.bind(this, record)}>修改</a>
          <span className="ant-divider"></span>
          <a href="javascript:void(0)" onClick={this.changeRoles.bind(this, record)}>修改角色</a>
        </span>
      )}];

  editNode(node) {
    ST.history.push(`/backend/backend_users/edit/${node.id}`)
  }

  changeRoles(node) {
    ST.history.push(`/backend/backend_users/edit_roles/${node.id}`)
  }

  render() {
    let that = this
    return (
      <Table
        bordered={true}
        dataSource={this.props.dataSource}
        columns={this.columns}/>
    )

  }
}