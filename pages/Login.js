"use strict"
import React from 'react'
import { render } from 'react-dom'
import { Button, Form, Input } from 'antd';
import 'antd/dist/antd.css'
import ST from '../Setting'
import {Link} from 'react-router'
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

let BasicDemo = React.createClass({
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      ST.httpPost('/api/logins/login', values)
        .then(result=> {
          ST.storage.setItem('userInfo', JSON.stringify(result.data))
          ST.history.replace('/backend')
          ST.info.success('登陆成功!')
        })
        .catch(e=>ST.info.error(e.message)&&console.log(e.stack)).done
    })
  },

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldProps('username', {
      rules: [
        {required: true, whitespace: true, message: '请填写登录账号'},
      ],
    });

    const passwdProps = getFieldProps('password', {
      rules: [
        {required: true, whitespace: true, message: '请填写密码'},
      ],
    });

    const formItemLayout = {
      labelCol: {span: 7},
      wrapperCol: {span: 12},
    };

    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%', height: "100%"}}>
        <Form horizontal form={this.props.form} style={{width: '600px', marginTop: '200px' }}>
          <FormItem
            {...formItemLayout}
            label="用户名"
            hasFeedback
          >
            <Input {...nameProps}/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback
          >
            <Input {...passwdProps} type="password" autoComplete="off"
                                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
            />
          </FormItem>

          <FormItem wrapperCol={{ span: 12, offset: 7 }}>
            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={this.handleReset}>重置</Button>
          </FormItem>
        </Form>
      </div>

    );
  },
});

BasicDemo = createForm()(BasicDemo);

export default BasicDemo