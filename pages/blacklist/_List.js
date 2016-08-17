"use strict"
import React from 'react'
import {render} from 'react-dom'
import 'antd/dist/antd.css';
import {Button, Form, Input, Table, Popconfirm, Select, Pagination, Row} from 'antd';
import ST from '../../Setting.js'
import ListComponent from '../../componets/ListComponent.js'
import {blacklistKind} from '../../Locales.js'
export default class List extends ListComponent {

  columns = [{
    title: '用户id',
    dataIndex: 'userId',
    key: 'userId',
  }, {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'logo',
    dataIndex: 'logoPath',
    key: 'logoPath',
    render: (text, record)=> {
      if (text) {
        return <img src={text} alt="" style={{width: '50px', height: '50px'}}/>
      } else {
        return <p>暂无头像</p>
      }
    }
  }, {
    title: '黑名单种类',
    dataIndex: 'kind',
    key: 'kind',
    render(text, recrod) {
      return blacklistKind.fetch(text)||'未知'
    }
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

      }
    }];

  hardDelete(record) {
    ST.httpPost(
      `/api/blacklist/hard_delete?id=${record.userId}`)
      .then(result=> {
        ST.successReload('硬删除成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  softDelete(record) {
    ST.httpPost(
      `/api/blacklist/soft_delete?id=${record.userId}`)
      .then(result=> {
        ST.successReload('软删除成功')
      })
      .catch(e=>ST.info.error(e.message)).done
  }

}