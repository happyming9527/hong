"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Row, Col, Card, Breadcrumb, Button, Input } from 'antd'
import {Link} from 'react-router'
import ST, {SingleContainer} from '../../Setting.js'
import {userCategory} from '../../Locales.js'
export default class RolesEdit extends React.Component {
  constructor(props) {
    super(props)
    this.nodeId = this.props.params.id
    this.state = {
      node: {},
      loaded: false
    }
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    let that = this
    ST.httpPost(
      `/api/users/me?id=${this.nodeId}`)
      .then(result=> {
        that.setState({
          node: result.data,
          loaded: true
        })
      })
      .catch(e=>console.log(e.stack)&&ST.info.error(e.message)).done
  }

  render() {

    const ShowRow = (props)=> {
      return <Row style={{marginTop: 10}}>
        <Col span={2} style={{textAlign: 'right', fontWeight: 'bold'}}>{props.name}</Col>
        <Col span={22} style={{textAlign: 'left', paddingLeft: 20}}>{props.value ||
        <span style={{color: 'red'}}>暂无</span>}</Col>
      </Row>
    }

    let breadcrumb = [{name: '用户管理', url: '/backend/gift_orders'}, {name: '查看用户'}];
    let node = this.state.node
    return (
      <SingleContainer
        back={true}
        loaded={this.state.loaded}
        breadcrumb={breadcrumb}>
        <div>
          <ShowRow name={'id'} value={node.userId} />
          <ShowRow name={'名称'} value={node.name} />
          <ShowRow name={'生日'} value={node.birthDate} />
          <ShowRow name={'手机号'} value={node.acct} />
          <ShowRow name={'积分'} value={node.score} />
          <ShowRow name={'成长值'} value={node.growthValue} />
          <ShowRow name={'偶像数量'} value={node.followCount} />
          <ShowRow name={'粉丝数量'} value={node.followerCount} />
          <ShowRow name={'城市名称'} value={node.cityName} />
          <ShowRow name={'阶段'} value={userCategory.fetch(node.userCategory)||'未知'} />
          <ShowRow name={'邀请人id'} value={node.invitorId} />
          <ShowRow name={'在黑名单中'} value={node.inBlackList} />
        </div>
      </SingleContainer>
    )
  }
}
