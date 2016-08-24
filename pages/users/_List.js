"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm} from 'antd';
import ST from '../../Setting.js'
import ListComponent from '../../componets/ListComponent.js'

export default class List extends ListComponent {
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
      title: '积分',
      dataIndex: 'score',
      key: 'score'
    },{
      title: '成长值',
      dataIndex: 'growth_value',
      key: 'growth_value'
    },{
      title: '手机号',
      dataIndex: 'acct',
      key: 'acct'
    },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => {
          let buttons = [
            <a key="查看" href="javascript:void(0)" onClick={this.showMe.bind(this, record)}>查看</a>,
            <a key="发送广播" href="javascript:void(0)" onClick={this.sendMessage.bind(this, record)}>发送广播</a>,
            <a key="我的时光轴" href="javascript:void(0)" onClick={this.showMyFeedList.bind(this, record)}>我的时光轴</a>,
            <a key="我的粉丝" href="javascript:void(0)" onClick={this.showFansList.bind(this, record)}>我的粉丝</a>,
            <a key="我的偶像" href="javascript:void(0)" onClick={this.showIdolsList.bind(this, record)}>我的偶像</a>,
          ]
          if (!record.inBlackList) {
            buttons.push(<a key="加入黑名单" href="javascript:void(0)" onClick={this.addToBlacklist.bind(this, record)}>加入黑名单</a>)
          }
          buttons = ST.opSeparate(buttons)
          return <span> {buttons} </span>
        }
      }
    ];
  }

  showFansList(record) {
    ST.history.push(`/backend/users/fans_list/${record.userId}`)
  }

  showMe(record) {
    ST.history.push(`/backend/users/show/${record.userId}`)
  }

  showIdolsList(record) {
    ST.history.push(`/backend/users/idols_list/${record.userId}`)
  }

  sendMessage(record) {
    ST.history.push(`/backend/users/send_message/${record.userId}`)
  }

  showMyFeedList(record) {
    ST.history.push(`/backend/users/my_user_feeds/${record.userId}`)
  }

  addToBlacklist(record) {
    ST.httpPost(
      `/api/users/add_to_blacklist?id=${record.userId}&kind=${1}`)
      .then(result=> {
        ST.successReload('加入普通黑名单成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  addToBangBlacklist(record) {
    ST.httpPost(
      `/api/users/add_to_blacklist?id=${record.userId}&kind=${2}`)
      .then(result=> {
        ST.successReload('加入普通黑名单成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }


}