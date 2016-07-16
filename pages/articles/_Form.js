"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, Tabs, Row, Col , Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import ST from '../../Setting.js'
import WriteArticle from './WriteArticle.js'
import Atts from './Attachments.js'

class Demo extends React.Component {

  constructor(props) {
    super(props)
    this.defaultTags = ['孕期', '生啦']
    let selfTags = ST.compact(this.props.oldNode.tag.split(','))
    let tags = selfTags.concat(this.defaultTags)
    this.state = {
      resList: this.props.oldNode.resList.slice(),
      tag: tags,
      selfTags: selfTags
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.oldNode !== nextProps.oldNode) {
      let selfTags = ST.compact(nextProps.oldNode.tag.split(','))
      let tags = selfTags.concat(this.defaultTags)
      tags = tags.filter((i, index)=>{
        return (tags.indexOf(i)==index) && i
      })
      this.setState({
        resList: nextProps.oldNode.resList.slice(),
        tag: nextProps.oldNode.tag.split(','),
        selfTags: selfTags
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      values['content'] = this.editor.getContent()
      values['feedType'] = 1
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

  removeLogoImage(image) {
    let newList = this.state.resList.filter(i=>{
      return i !== image
    })
    this.setState({
      resList: newList
    })
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

    let children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

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
                            <a onClick={this.removeLogoImage.bind(this, i)} vhref="javascript:void(0)">删除</a>
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
          label="标签"
        >
          <Select tags
                  defaultValue = {this.state.selfTags}
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
          <WriteArticle ref={i=>this.editor=i} initContent={this.props.oldNode.content} />
        </FormItem>
        <FormItem wrapperCol={{ span: 21, offset: 3 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">确定</Button>
          &nbsp;&nbsp;&nbsp;
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