"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm, Row, Pagination} from 'antd';

export default class ListComponent extends React.Component {

  render() {
    let that = this
    return (
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
    )
  }
}