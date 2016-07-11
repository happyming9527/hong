import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Collapse, Form, Input, Button, DatePicker, Row, Col, Table, Breadcrumb, Card, Tabs } from 'antd'
import ST from '../Setting.js'
import List from './roles/_List.js'
import {Link} from 'react-router'
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;
import RichEditor from './RichEditor.js'
import RichEditorPreview from './RichEditorPreview.js'

export default class WriteArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      html: null
    }
  }

  componentWillMount() {
  }

  getContent() {
    return this.editor.getContent()
  }

  preview(key) {
    if (key==='2') {
      this.setState({
        html: this.getContent()
      })
    }
  }

  render() {
    let that = this
    return (
      <Row gutter={2}>
        <Tabs defaultActiveKey="1" onChange={this.preview.bind(this)}>
          <TabPane tab="编辑" key="1">
            <RichEditor changeCallback={this.preview.bind(this)} ref={i=>this.editor=i} initContent={this.props.initContent}/>
          </TabPane>
          <TabPane tab="预览" key="2">
            <RichEditorPreview html={this.state.html} />
          </TabPane>
        </Tabs>
      </Row>
    )
  }
}

WriteArticle.defaultProps = {
  initContent: '<p></p>'
}