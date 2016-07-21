"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm} from 'antd';
import ST from '../../Setting.js'

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [{
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

        }}];
  }

  editNode(record) {
    ST.history.push(`/backend/gifts/edit/${record.id}`)
  }

  showNode(record) {
    ST.history.push(`/backend/gifts/show/${record.id}`)
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