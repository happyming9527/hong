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
      dataIndex: 'userId',
      key: 'userId',
    },{
      title: '用户名',
      dataIndex: 'name',
      key: 'name'
    },{
      title: '头像',
      dataIndex: 'logoPath',
      key: 'logoPath',
      render: (text, record)=>{
        if (text) {
          return <img src={text} alt="" style={{width: '50px', height: '50px'}}/>
        } else {
          return <p>暂无头像</p>
        }
      }
    },{
      title: '是否在黑名单中',
      dataIndex: 'isInBlackList',
      key: 'isInBlackList',
      render: (text, record)=>{
        return text ? <p style={{color: 'red'}}>在黑名单中</p>: <p>正常</p>
      }
    },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => {
          return <span>
            <a href="javascript:void(0)" onClick={this.addToBlacklist.bind(this, record)}>加入普通黑名单</a>
            <span className="ant-divider"></span>
            <a href="javascript:void(0)" onClick={this.addToBangBlacklist.bind(this, record)}>加入星星榜黑名单</a>
          </span>

        }}];
  }

  addToBlacklist(record) {
    ST.httpPost(
      `/api/users/add_to_blacklist?id=${record.userId}&kind=${1}`)
      .then(result=> {
        ST.historyReload('/backend/users')
        ST.info.success('加入普通黑名单成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  addToBangBlacklist(record) {
    ST.httpPost(
      `/api/users/add_to_blacklist?id=${record.userId}&kind=${2}`)
      .then(result=> {
        ST.historyReload('/backend/users')
        ST.info.success('加入普通黑名单成功')
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