import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card } from 'antd'
import ST from '../Setting.js'
import List from './roles/_List.js'
import {Link} from 'react-router'
const Panel = Collapse.Panel;
import RichEditor from './RichEditor.js'

export default class BackendUser extends React.Component {
  constructor(props) {
    super(props)
    //this.state = {
    //  dataSource: [],
    //  total: 0,
    //}
    //this.searchCondition = {}
    //this.per = 10
    //this.currentPage = 1

  }

  //componentWillMount() {
  //  this.fetchData()
  //}
  //
  //fetchData() {
  //  ST.httpPost(
  //    `/api/roles/list?page=${this.currentPage}&per=${this.per}`, {q: this.searchCondition})
  //    .then(result=> {
  //      let dataSource = result.data.data.map(ele=> {
  //        ele.key = ele.id.toString()
  //        return ele
  //      })
  //      this.setState({
  //        total: result.data.size,
  //        loaded: true,
  //        dataSource: dataSource
  //      })
  //    })
  //    .catch(e=>ST.info.error(e.message)).done
  //}

  //changeConditionAndSearch(json) {
  //  this.searchCondition = json;
  //  this.fetchData()
  //}
  //
  //changePage(page) {
  //  this.currentPage = page
  //  this.fetchData()
  //}
  //
  //addFunc() {
  //  ST.history.push('/backend/roles/add')
  //}

  submit() {
    console.log(this.editor.getContent())
  }

  render() {
    let that = this
    return (
      <ST.Container breadcrumb={[{name: '测试页'}]}>
        <ST.PaddingRow>
          <RichEditor ref={i=>this.editor=i}/>
        </ST.PaddingRow>
        <ST.PaddingRow
          style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Button type="primary" htmlType="submit" onClick={this.submit.bind(this)}>提交</Button>
        </ST.PaddingRow>
      </ST.Container>
    )
  }
}