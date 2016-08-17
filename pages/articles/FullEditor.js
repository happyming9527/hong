"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form, Tabs , Row, Input as AntdInput} from 'antd';
import RichEditorPreview from '../articles/RichEditorPreview.js'
import RichEditor from './RichEditor.js'
const TabPane = Tabs.TabPane;

export default class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.initialValue,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.initialValue !== nextProps.initialValue) {
      this.state = {
        value: nextProps.initialValue
      }
    }
  }

  contentChange=(value) =>{
    this.setState({
      value: value
    })
    this.props.onValueChange(value)
  }


  render() {
    debugger
    return (
      <Row gutter={2}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="编辑" key="1">
            <RichEditor
              onChange={this.contentChange}
              initContent={this.state.value} />
          </TabPane>
          <TabPane tab="预览" key="2">
            <RichEditorPreview
              html={this.state.value}
              needWrapper={true}
              isUrl={false} />
          </TabPane>
        </Tabs>
      </Row>
    )
  }
}