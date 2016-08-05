"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm, Row, Pagination} from 'antd';
import ST from '../../Setting.js'

export default class BackendUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vertical: true
    }
    this.columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },{
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    },{
      title: '开始日期',
      dataIndex: 'startDateNice',
      key: 'startDateNice',
    },{
      title: '结束日期',
      dataIndex: 'endDateNice',
      key: 'endDateNice',
    },{
      title: '揭奖日期',
      dataIndex: 'resultDateNice',
      key: 'resultDateNice',
    },
      {
        title: '操作',
        key: 'operation',
        render: this.actionButtons.bind(this)}];
  }

  actionButtons(text, record) {
    let buttons = [
      <a key="查看" href="javascript:void(0)" onClick={this.showNode.bind(this, record)}>查看</a>,
      <a key="修改" href="javascript:void(0)" onClick={this.editNode.bind(this, record)}>修改</a>
    ]
    buttons = ST.opSeparate(buttons)
    return <span> {buttons} </span>
  }

  editNode(record) {
    ST.history.push(`/backend/pk_activities/edit/${record.id}`)
  }


  showNode(record) {
    ST.history.push(`/backend/pk_activities/show/${record.id}`)
  }

  render() {
    let that = this
    return (
      <div>
        <Row>
          <Table
            bordered={true}
            dataSource={this.props.dataSource}
            columns={this.columns}/>
          <Pagination
            showQuickJumper
            total={this.props.total}
            current={parseInt(this.props.currentPage)}
            pageSize={parseInt(this.props.pageSize)}
            showTotal={
              total=>`共 ${parseInt(this.props.total)} 条`
            }
            onChange={
              current=>{
                that.props.changePage(current)
              }
            }
          />
        </Row>
      </div>
    )

  }
}