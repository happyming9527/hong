"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input, TreeSelect,Select } from 'antd'
import {Link} from 'react-router'
import List from 'list-to-tree'
import ST from '../../Setting.js'
const Option = Select.Option;

export default class BackendUserEditRoles extends React.Component {
  constructor(props) {
    super(props)
    this.nodeId = this.props.params.id
    this.state = {
      loaded: false,
      node: null,
      selectedRoles: [],
      totalRoles: []
    }
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    let that = this
    ST.httpPost(
      `/api/backend_users/get_roles?id=${this.nodeId}`)
      .then(result=> {
        let selectedRoleIds = result.data.selected_roles.map(i=>i.id.toString())
        that.setState({
          loaded: true,
          node: result.data.me,
          selectedRoles: selectedRoleIds,
          totalRoles: result.data.total_roles
        })
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  submitCallback() {
    ST.httpPost(`/api/backend_users/change_roles?id=${this.nodeId}`, {data: this.state.selectedRoles})
      .then(result=> {
        ST.info.success(result.text)
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  goBack() {
    ST.history.replace('/backend/backend_users')
  }

  handleChange(value) {
    let that = this
    that.setState({ selectedRoles: value });
  }

  render() {

    let children = this.state.totalRoles.map(ele=>{
      return <Option key={ele.id.toString()}>{ele.name}</Option>
    })

    return (
      !this.state.loaded ? ST.loading() :
        <div style={{width: '100%', padding: '20px 30px'}}>
          <Row>
            <Breadcrumb separator=">">
              <Breadcrumb.Item><Link to="/backend">首页</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/backend/backend_users">用户管理</Link></Breadcrumb.Item>
              <Breadcrumb.Item>修改后台用户角色({this.state.node.name})</Breadcrumb.Item>
            </Breadcrumb>
          </Row>

          <Row>
            <Card>
              <Select multiple
                style={{ width: 400 }}
                defaultValue={this.state.selectedRoles} onChange={this.handleChange.bind(this)}>
                {children}
              </Select>
              <Button type="primary" htmlType="submit" style={{marginLeft: 20}} onClick={this.submitCallback.bind(this)}>修改</Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="ghost" onClick={this.goBack.bind(this)}>返回</Button>
            </Card>
          </Row>
        </div>
    )

  }
}