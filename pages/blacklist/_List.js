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
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: 'logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (text, record)=>{
        return <img src={record.logo} alt="" style={{width: '50px', height: '50px'}}/>
      }
    },{
      title: '黑名单种类',
      dataIndex: 'kindDesc',
      key: 'kindDesc',
    },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => {

          return <span>
            <a href="javascript:void(0)" onClick={this.softDelete.bind(this, record)}>软删除</a>
            <span className="ant-divider"></span>
            <a href="javascript:void(0)" onClick={this.hardDelete.bind(this, record)}>硬删除</a>
          </span>

        }}];
  }

  hardDelete(record) {
    ST.httpPost(
      `/api/blacklist/hard_delete?id=${record.userId}`)
      .then(result=> {
        ST.historyReload('/backend/blacklist')
        ST.info.success('硬删除成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  softDelete(record) {
    ST.httpPost(
      `/api/blacklist/soft_delete?id=${record.userId}`)
      .then(result=> {
        ST.historyReload('/backend/blacklist')
        ST.info.success('软删除成功')
      })
      .catch(e=>ST.info.error(e.message)).done
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