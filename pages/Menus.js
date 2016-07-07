import React from 'react'
import { render } from 'react-dom'
import Tree from 'react-ui-tree'
import cn from 'classnames'
import 'react-ui-tree/lib/react-ui-tree.less'
import './tree.scss'
import { Row, Col, Card, Breadcrumb } from 'antd';
import 'antd/dist/antd.css'
import {Link} from 'react-router'
import ST from '../Setting.js'
import List from 'list-to-tree'
import Form from './menus/Form.js'

export default class Menus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: true,
      tree: null,
      operationType: '查看'
    }
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    ST.httpPost('/api/menus/list')
      .then(result=> {
        let dataSource = result.data
        let menus = dataSource.map(ele=>{
          let isParent = dataSource.find(i=>{
            return i.parent_id === ele.id
          })
          if (isParent) {
            ele.collapsed = false
            ele.isFolder = true
          } else {
            ele.leaf = true
          }
          ele.module = ele.name
          return ele
        })

        let ltt = new List(menus, {
          key_id: 'id',
          key_parent: 'parent_id',
          key_child: 'children'
        })
        let tree = ltt.GetTree()
        let rootTree = tree[0]
        this.setState({
          loaded: true,
          tree: rootTree
        })
      })
      .catch(e=>ST.info.error(e.message)).done
  }

  editNode(node) {
    this.setState({
      operationType: '修改'
    })
  }

  addNode(node) {
    this.setState({
      operationType: '新增'
    })
  }

  handleChange(tree) {
    this.setState({
      tree: tree
    });
  }

  onClickNode(node) {
    this.setState({
      operationType: '查看',
      active: node
    });
  }

  renderNode(node) {
    return (
      <div>
        <span
          className={cn('node', { 'is-active': node === this.state.active })}>
          <span onClick={this.onClickNode.bind(this, node)}>{node.module}</span>
          <span
            style={{marginLeft: 5}}
            className={cn({ hidden: node !== this.state.active })}>
            <a style={{marginLeft: 5}} onClick={this.editNode.bind(this, node)}>编辑</a>
            <a style={{marginLeft: 5}} onClick={this.addNode.bind(this, node)}>增加</a>
          </span>
        </span>
      </div>
    );
  }

  render() {
    let that = this
    return (
      !this.state.loaded ? ST.loading() :
        <div style={{width: '100%', padding: '20px 30px'}}>
          <Row>
            <Breadcrumb separator=">">
              <Breadcrumb.Item><Link to="/backend">首页</Link></Breadcrumb.Item>
              <Breadcrumb.Item>菜单管理</Breadcrumb.Item>
            </Breadcrumb>
          </Row>

          <Row gutter={16}>
            <Col span={10}>
              <Card title="菜单">
                {
                  !this.state.tree ? null:
                    <Tree
                      paddingLeft={20}
                      tree={this.state.tree}
                      onChange={this.handleChange.bind(this)}
                      renderNode={this.renderNode.bind(this)}
                    />
                }
              </Card>
            </Col>
            <Col span={14}>
              <Card title={`操作${!this.state.active ? '':`( ${this.state.operationType} )`}`}>
                <Form key={this.state.operationType} currentNode={this.state.active} operationType={ this.state.operationType }/>
              </Card>
            </Col>

          </Row>
        </div>

    )

  }
}