"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, TreeSelect } from 'antd';
const FormItem = Form.Item;
import ST from '../../Setting.js'

class Demo extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      this.props.submitCallback(values)
    })
  }

  checkPass(rule, value, callback) {
    const form = this.props.form;
    if (form.getFieldValue('password')) {
      form.validateFields(['password_confirmation'], { force: true });
    }

    callback();
  }

  checkPass2(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const oldPasswordProps = getFieldProps('password_old', {
      rules: [
        {required: true, min: 5, message: '请填写原有登陆密码'},
        { validator: this.checkPass.bind(this) }
      ],
    });

    const passwordProps = getFieldProps('password', {
      rules: [
        {required: true, min: 5, message: '请填写新的登陆密码'},
        { validator: this.checkPass.bind(this) }
      ],
    });

    const passwordConfirmationProps = getFieldProps('password_confirmation', {
      rules: [
        {required: true, min: 5, message: '请填写确认密码'},
        { validator: this.checkPass2.bind(this) }
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
          label="原密码"
        >
          <Input type="password" {...oldPasswordProps} />
        </FormItem>

        <FormItem
          hasFeedback
          {...formItemLayout}
          label="密码"
        >
          <Input type="password" {...passwordProps} />
        </FormItem>

        <FormItem
          hasFeedback
          {...formItemLayout}
          label="确认密码"
        >
          <Input type="password" {...passwordConfirmationProps} />
        </FormItem>

        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={()=>ST.history.replace('/backend/backend_users')}>返回</Button>
        </FormItem>
      </Form>
    );
  }
};

Demo.defaultProps = {
  oldNode: {}
}

export default Form.create()(Demo)