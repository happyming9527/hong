"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, TreeSelect } from 'antd';
const FormItem = Form.Item;
import ST from '../../Setting.js'

class Demo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showPassword: this.props.oldNode.id ? false:true
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      this.props.submitCallback(values)
    })
  }

  showPassword() {
    this.setState({
      showPassword: !this.state.showPassword
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

    const usernameProps = getFieldProps('username', {
      initialValue: this.props.oldNode.username,
      validate: [{
        rules: [
          { required: true, message: '请输入正确的邮箱'},
        ],
        trigger: 'onBlur'
      }, {
        rules: [
          { type: 'email', message: '请输入正确的邮箱' },
        ],
        trigger: ['onBlur', 'onChange'],
      }],
    });

    const nameProps = getFieldProps('name', {
      initialValue: this.props.oldNode.name,
      rules: [
        {required: true, whitespace: true, message: '请填写名称'},
      ],
    });

    const passwordProps = getFieldProps('password', {
      initialValue: this.props.oldNode.password,
      rules: [
        {required: true, min: 5, message: '请填写登陆密码'},
        { validator: this.checkPass.bind(this) }
      ],
    });

    const passwordConfirmationProps = getFieldProps('password_confirmation', {
      initialValue: this.props.oldNode.password_confirmation,
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
          label="登录名"
        >
          <Input type="email" {...usernameProps} />
        </FormItem>

        <FormItem
          hasFeedback
          {...formItemLayout}
          label="真名"
        >
          <Input type="text" {...nameProps} />
        </FormItem>

        {
          !this.state.showPassword ? null:
            <FormItem
              hasFeedback
              {...formItemLayout}
              label="密码"
            >
              <Input type="password" {...passwordProps} />
            </FormItem>
        }

        {
          !this.state.showPassword ? null:
            <FormItem
              hasFeedback
              {...formItemLayout}
              label="确认密码"
            >
              <Input type="password" {...passwordConfirmationProps} />
            </FormItem>
        }

        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">确定</Button>
          {
            !this.props.oldNode.id ? null: <Button style={{marginLeft: 10}} type="dashed" onClick={this.showPassword.bind(this)}>
            {
              this.state.showPassword ? '不修改密码':'修改密码'
            }
            </Button>
          }
          <Button style={{marginLeft: 10}} type="ghost" onClick={()=>ST.history.replace('/backend/backend_users')}>返回</Button>
        </FormItem>
      </Form>
    );
  }
};

Demo.defaultProps = {
  oldNode: {}
}

export default Form.create()(Demo)