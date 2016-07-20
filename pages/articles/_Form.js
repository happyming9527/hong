"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, Tabs, Row, Col , Select} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
import ST from '../../Setting.js'
import Atts from '../Attachments.js'
import RichEditorPreview from '../articles/RichEditorPreview.js'
import RichEditor from './RichEditor.js'

class Demo extends React.Component {

  constructor(props) {
    super(props)
    this.categories = [{key: 1, value: '备孕'}, {key: 2, value: '孕期'}, {key: 3, value: '已生'}]
    this.defaultTags = ['孕期', '生啦']
    let selfTags = ST.compact(this.props.oldNode.tag.split(','))
    let tags = selfTags.concat(this.defaultTags)
    let userCategory = this.categories.find(i=>i.key==this.props.oldNode.userCategory)
    this.state = {
      resList: this.props.oldNode.resList.slice(),
      tag: tags,
      selfTags: selfTags,
      userCategory: userCategory&&userCategory.value
    }
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.oldNode !== nextProps.oldNode) {
      let selfTags = ST.compact(nextProps.oldNode.tag.split(','))
      console.log(selfTags)
      let tags = selfTags.concat(this.defaultTags)
      tags = tags.filter((i, index)=>{
        return (tags.indexOf(i)==index) && i
      })
      let userCategory = this.categories.find(i=>i.key==nextProps.oldNode.userCategory)
      this.setState({
        resList: nextProps.oldNode.resList.slice(),
        tag: tags,
        selfTags: selfTags,
        userCategory: userCategory&&userCategory.value
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      if (this.props.kind=='egc') {
        values['content'] = this.editor.getContent()
        values['feedType'] = 1
      } else {
        values['feedType'] = 2
      }
      values['userCategory'] = this.state.userCategory
      values['resList'] = this.state.resList
      values['tag'] = this.state.selfTags.join(',')
      this.props.submitCallback(values)
    })
  }

  openModal() {
    this.attachment.toggle()
  }

  confirmMedia(result) {
    let list = this.state.resList.slice()
    list.push({
      resType: 1,
      content: result
    })
    this.setState({
      resList: list
    })
  }

  changeTags(value) {
    this.setState({
      selfTags: value
    })
  }

  changeCategory(value) {
    this.setState({
      userCategory: value
    })
  }

  removeLogoImage(image) {
    let newList = this.state.resList.filter(i=>{
      return i !== image
    })
    this.setState({
      resList: newList
    })
  }

  preview(key) {
    if (key==='2') {
      let content
      if (this.props.kind == 'link') {
        const { getFieldValue } = this.props.form;
        content = getFieldValue('content')
      } else if (this.props.kind == 'egc') {
        content = this.editor.getContent()
      }
      this.setState({
        html: content
      })
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    };

    const titleProps = getFieldProps('title', {
      initialValue: this.props.oldNode.title,
      rules: [
        {required: true, whitespace: true, message: '请填写标题'},
      ],
    });

    let content

    if (this.props.kind == 'link') {
      const contentProps = getFieldProps('content', {
        initialValue: this.props.oldNode.content,
        rules: [
          {required: true, whitespace: true, message: '请填写链接'},
        ],
      });
      content = <Input type="text" {...contentProps} />
    } else if (this.props.kind == 'egc') {
      content = <RichEditor ref={i=>this.editor=i} initContent={this.props.oldNode.content} />
    }

    console.log(this.state.selfTags)
    return (
      <Form
        form={this.props.form}
        horizontal
        onSubmit={this.handleSubmit.bind(this)}>
        <FormItem
          hasFeedback
          {...formItemLayout}
          label="标题"
        >
          <Input type="text" {...titleProps} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="标题图片"
        >
          <Atts ref={i=>this.attachment=i} submitCallback={this.confirmMedia.bind(this)} attachmentKind={'image'} />
          {
            [<Row key="row1">
              <Button type="primary" onClick={this.openModal.bind(this)}>插入图片</Button>
            </Row>,
            <Row  key="row2" gup={5}>
              {
                !this.state.resList ? <div>暂无标题图片</div>:
                  this.state.resList.map(
                    (i, index)=>{
                      return (
                        <Col span={3} key={index} style={{margin: '10px 0px 10px 0px', textAlign: 'center'}}>
                          <img
                            src={i.content}
                            alt={i.content}
                            style={{width: '100px', height: '100px', border: '1px solid gray'}} />
                          <div>
                            <a onClick={this.removeLogoImage.bind(this, i)} href="javascript:void(0)">删除</a>
                          </div>
                        </Col>
                      )
                    }
                  )
              }
            </Row>
            ]
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="阶段"
        >
          <Select
            value = {this.state.userCategory}
            style={{ width: '100%' }}
            onChange={this.changeCategory.bind(this)}
          >
            {
              this.categories.map(i=>{
                return <Option key={i.key}>{i.value}</Option>
              })
            }
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="标签"
        >
          <Select
            tags
            value = {this.state.selfTags}
            style={{ width: '100%' }}
            searchPlaceholder="标签模式"
            onChange={this.changeTags.bind(this)}
          >
          {
            this.state.tag.map(i=>{
              return <Option key={i}>{i}</Option>
            })
          }
          </Select>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="内容"
        >
          <Row gutter={2}>
            <Tabs defaultActiveKey="1" onChange={this.preview.bind(this)}>
              <TabPane tab="编辑" key="1">
                {content}
              </TabPane>
              <TabPane tab="预览" key="2">
                <RichEditorPreview html={this.state.html} needWrapper={true} isUrl={this.props.kind=='link'} />
              </TabPane>
            </Tabs>
          </Row>
        </FormItem>
        <FormItem wrapperCol={{ span: 21, offset: 3 }} style={{ marginTop: 24 }}>
          {
            this.props.readonly ? null:<Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>确定</Button>
          }
          <Button type="ghost" onClick={ST.historyGoBack}>返回</Button>
        </FormItem>

      </Form>
    );
  }
};

Demo.defaultProps = {
  oldNode: {resList: [], tag: ''}
}

export default Form.create()(Demo)