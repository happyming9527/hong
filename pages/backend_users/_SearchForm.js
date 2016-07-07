"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

let BasicDemo = React.createClass({
  componentWillReceiveProps(nextProps) {
    return false
  },

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  },

  handleSubmit(e) {
    let that = this;
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log(values);
      that.props.searchCallback(values)
    });
  },

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldProps('username_cont', {
      rules: [],
    });

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    return (
      <Form horizontal form={this.props.form}>
        <FormItem
          {...formItemLayout}
          label="用户名"
          hasFeedback
        >
          <Input {...nameProps} placeholder="" />
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    );
  },
});

BasicDemo = createForm()(BasicDemo);

export default BasicDemo