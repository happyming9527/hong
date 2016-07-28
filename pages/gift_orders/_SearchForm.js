"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, InputNumber, Select } from 'antd';
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
import ST from '../../Setting.js'

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
    const userNameProps = getFieldProps('userName', {
      rules: [],
    });
    const userIdProps = getFieldProps('userId', {
      rules: [],
    });
    const giftIdProps = getFieldProps('giftId', {
      rules: [],
    });
    const orderStatusProps = getFieldProps('orderStatus', {
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
          label="申请用户名"
        >
          <Input {...userNameProps} placeholder="" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="申请用户id"
        >
          <InputNumber min={1} style={{ width: 200 }} {...userIdProps} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="礼品id"
        >
          <InputNumber min={1} style={{ width: 200 }} {...giftIdProps} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="状态"
        >
          <Select defaultValue="1" style={{ width: 120 }} {...orderStatusProps}>
            <Option value="0">不区分状态</Option>
            {
              ST.Locales.giftOrderStatus.map(i=>{
                return <Option value={i.key} key={i.key}>{i.value}</Option>

              })
            }
          </Select>
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