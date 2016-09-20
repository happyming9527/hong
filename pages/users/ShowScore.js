import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import List from './_ScoreList.js'
import SearchForm from './_SearchForm.js'
import SearchComponent from '../../componets/SearchComponent.js'
import ST, {Container} from '../../Setting.js'

export default class FansList extends SearchComponent {
  url = `/api/users/get_scores?id=${this.props.params.id}`
  keyName = 'id'

  componentWillMount() {
    super.componentWillMount()
    this.getData()
  }

  addScore() {
    ST.history.push(`/backend/users/add_score/${this.props.params.id}`)
  }

  addGrowth() {
    ST.history.push(`/backend/users/add_growth/${this.props.params.id}`)
  }

  getData() {
    let that = this
    ST.httpPost(
      `/api/users/me?id=${this.props.params.id}`)
      .then(result=> {
        that.setState({
          oldNode: result.data,
        })
      })
      .catch(e=>console.log(e.stack)&&ST.info.error(e.message)).done
  }

  render() {
    let that = this
    let breadcrumb = [
      {name: 'app用户列表', url: '/backend/users'},
      {name: `用户${this.state.oldNode&&this.state.oldNode.name}积分列表`}
    ]
    debugger
    return (
      <Container breadcrumb={breadcrumb}>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.addScore.bind(this)}>下发积分{`( 现有积分: ${this.state.oldNode&&this.state.oldNode.score} )`}</Button>

          <Button
            type="primary"
            htmlType="submit"
            style={{marginLeft: 20}}
            onClick={this.addGrowth.bind(this)}>下发成长值{`( 现有成长值: ${this.state.oldNode&&this.state.oldNode.growthValue} )`}</Button>

        </Row>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          </Row>

        <Row style={{marginTop: 20, marginBottom: 20}}>
          {this.makeList(List)}
        </Row>
      </Container>
    )
  }
}