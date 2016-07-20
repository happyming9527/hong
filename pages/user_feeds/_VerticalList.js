"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm, Pagination, Row, Col} from 'antd';
import ST from '../../Setting.js'

export default class VerticalList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1
    }
  }

  top(record) {
    alert(record.content)
  }
  changePage(page) {
    this.setState({
      currentPage: page
    })
    this.props.pagination.onChange(page)
  }

  render() {
    return (
      <div>
        <div style={{marginBottom: 20}}>
          {
            this.props.dataSource.map((i, index)=>{
              return (
                <Row key={i.id} style={{borderWidth: 0, borderTopWidth: '1px',borderBottomWidth: (index==this.props.dataSource.length-1) ? 1:0,  borderStyle: 'solid', borderColor: 'gray', padding: 20}}>
                  <Col span={2}>
                    logo
                  </Col>
                  <Col span={22}>
                    <Row>
                      <div style={{display: 'flex', direction: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <div>{i.userId}</div>
                        <div>{i.createTime}</div>
                      </div>
                    </Row>
                    <Row>
                      <div>{i.content}</div>
                    </Row>
                    <Row gutter={10}>
                      {
                        i.resList&&i.resList.map(i=>{
                          let com
                          if (i.resType==1) {
                            com = <Col span={8} key={i.id} style={{padding: '10px'}}>
                              <img src={i.content} style={{width: '200px'}}/>
                            </Col>
                          } else if (i.resType==2) {
                            com = <Col span={8} key={i.id} style={{padding: '10px'}}>
                              <video src={i.content} controls style={{width: '200px'}}/>
                            </Col>
                          }
                          return com
                        })
                      }
                    </Row>
                    <Row>
                      {this.props.actionButtons(null, i)}
                    </Row>
                  </Col>
                </Row>
              )
            })
          }
        </div>
        <Pagination
          showQuickJumper
          current={this.state.currentPage}
          defaultCurrent={1}
          total={this.props.pagination.total}
          showTotal={this.props.pagination.showTotal}
          pageSize={this.props.pagination.pageSize}
          onChange={this.changePage.bind(this)}
        />
      </div>

    )
  }
}