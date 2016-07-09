"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input, TreeSelect } from 'antd'
import {Link} from 'react-router'
import List from 'list-to-tree'
import ST from '../../Setting.js'

export default class RolesEditMenus extends React.Component {
  constructor(props) {
    super(props)
    this.nodeId = this.props.location.query.id
    this.nodeName = this.props.location.query.name
    this.state = {
      loaded: false,
      value: []
    }
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    let that = this
    ST.httpPost(
      `/api/roles/get_menus?id=${this.nodeId}`)
      .then(result=> {
        let selectedMenus = result.data.selected_menus.map(i=>i.id.toString())
        console.log(selectedMenus)
        that.flatenMenus = result.data.total_menus.map(
          i=>{
            if (i.parent_id) {
              i.listOrderNum = parseInt(i.parent_id)
            } else {
              i.listOrderNum = null
            }
            i.label = i.name
            i.value = i.id.toString()
            i.key = i.id.toString()
            return i
          }
        )

        let ltt = new List(that.flatenMenus, {
          key_id: 'id',
          key_parent: 'listOrderNum',
          key_sequence: 'order_num',
          key_child: 'children'
        })

        var tree = ltt.GetTree()
        that.menus = tree
        that.setState({
          loaded: true,
          value: selectedMenus
        })
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  onChange(value) {
    let that = this
    that.setState({ value });
  }

  returnResult() {
    return this.state.value
  }

  submitCallback() {
    ST.httpPost(`/api/roles/change_menus?id=${this.nodeId}`, {data: this.state.value})
      .then(result=> {
        ST.info.success(result.text)
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  render() {

    const tProps = {
      size: 'large',
      treeData: this.menus,
      value: this.state.value,
      onChange: this.onChange.bind(this),
      multiple: true,
      treeCheckable: true,
      treeDefaultExpandAll: true,
      showCheckedStrategy: TreeSelect.SHOW_PARENT,
      searchPlaceholder: '请选择',
      style: {
        width: 600,
      },
    };

    return (
      !this.state.loaded ? ST.loading() :
        <div style={{width: '100%', padding: '20px 30px'}}>
          <Row>
            <Breadcrumb separator=">">
              <Breadcrumb.Item><Link to="/backend">首页</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/backend/roles">角色管理</Link></Breadcrumb.Item>
              <Breadcrumb.Item>修改角色菜单({this.nodeName})</Breadcrumb.Item>
            </Breadcrumb>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Card>
                <TreeSelect {...tProps} />
                <Button type="primary" htmlType="submit" style={{marginLeft: 20}} onClick={this.submitCallback.bind(this)}>修改</Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="ghost" onClick={ST.historyGoBack}>返回</Button>
              </Card>
            </Col>
          </Row>
        </div>
    )

  }
}