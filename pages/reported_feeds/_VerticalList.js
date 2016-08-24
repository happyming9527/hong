"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm, Pagination, Row, Col} from 'antd';
import ST from '../../Setting.js'
import {ReportedFeedState} from '../../Locales.js'

export default class VerticalList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1
    }
  }

  changePage(page) {
    this.setState({
      currentPage: page
    })
    this.props.pagination.onChange(page)
  }

  render() {
    let that = this;
    return (
      <div>
        <div style={{marginBottom: 20}}>
          {
            this.props.dataSource.map((i, index)=> {
              let state = ReportedFeedState.fetch(parseInt(i.reportState))
              if (parseInt(i.reportState) == 50) {
                state = <span style={{color:'red'}}>{state}</span>
              } else {
                state = state
              }
              return (
                <Row
                  gutter={16}
                  key={i.id}
                  style={{borderWidth: 0, borderTopWidth: '1px',borderBottomWidth: (index==this.props.dataSource.length-1) ? 1:0,  borderStyle: 'solid', borderColor: 'gray', padding: 20}}>
                  <Col span={2}>
                    <img src={i.userLogo} alt={i.userLogo} style={{width: 50,height: 50}}/>
                  </Col>
                  <Col
                    span={22}>
                    <Row>
                      <div style={{display: 'flex', direction: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <div>用户名称:{i.userName} &emsp;手机号:{i.acct} &emsp;用户id:{i.userId} &emsp;feed_id: {i.id} &emsp;处理方式: {state}</div>
                        <div>{i.pubTimeNice}</div>
                      </div>
                    </Row>
                    <Row>
                      <div>{i.content}</div>
                    </Row>
                    <Row gutter={10}>
                      {
                        i.resList && i.resList.map(i=> {
                          let com
                          if (i.resType == 1) {
                            com = <Col span={8} key={i.id} style={{padding: '10px'}}>
                              <img src={i.content} style={{width: '200px'}}/>
                            </Col>
                          } else if (i.resType == 2) {
                            com = <Col span={8} key={i.id} style={{padding: '10px'}}>
                              <video src={i.content} controls style={{width: '200px'}}/>
                            </Col>
                          }
                          return com
                        })
                      }
                    </Row>
                    <Row>
                      {
                        that.props.actionButtons(i)
                      }
                    </Row>
                  </Col>
                </Row>

              )
            })
          }
        </div>
      </div>

    )
  }
}