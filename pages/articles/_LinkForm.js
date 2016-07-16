"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, Tabs, Row, Col } from 'antd';
const FormItem = Form.Item;
import ST from '../../Setting.js'
import WriteArticle from './WriteArticle.js'
import Atts from './Attachments.js'

class Demo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      resList: this.props.oldNode.resList.slice()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.oldNode !== nextProps.oldNode) {
      this.setState({
        resList: nextProps.oldNode.resList.slice()
      })
    }
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      values['feedType'] = 2
      values['resList'] = this.state.resList
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

    const contentProps = getFieldProps('content', {
      initialValue: this.props.oldNode.content,
      rules: [
        {required: true, whitespace: true, message: '请填写链接'},
      ],
    });

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
          label="链接"
        >
          <Input type="text" {...contentProps} />
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