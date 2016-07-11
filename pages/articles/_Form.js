"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, Tabs } from 'antd';
const FormItem = Form.Item;
import ST from '../../Setting.js'
import WriteArticle from '../WriteArticle.js'

class Demo extends React.Component {

  constructor(props) {
    super(props)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      values['content'] = this.editor.getContent()
      values['kind'] = 'egc'
      console.log(values)
      this.props.submitCallback(values)
    })
  }

  render() {
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 1 },
      wrapperCol: { span: 23 },
    };

    const titleProps = getFieldProps('title', {
      initialValue: this.props.oldNode.title,
      rules: [
        {required: true, whitespace: true, message: '请填写标题'},
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
          label="内容"
        >
          <WriteArticle ref={i=>this.editor=i} initContent={this.props.oldNode.content} />
        </FormItem>
        <FormItem wrapperCol={{ span: 24, offset: 1 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={ST.historyGoBack}>返回</Button>
        </FormItem>
      </Form>
    );
  }
};

Demo.defaultProps = {
  oldNode: {}
}

export default Form.create()(Demo)