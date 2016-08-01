"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, InputNumber, Select } from 'antd';
const Option = Select.Option;

const createForm = Form.create;
const FormItem = Form.Item;
import ST from '../../Setting.js'
import {opState} from '../../Locales'

function noop() {
  return false;
}

let BasicDemo = React.createClass({


  componentWillReceiveProps(nextProps) {
    return false
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
    const nameProps = getFieldProps('userName', {
      initialValue: this.props.searchParams.userName,
      rules: [],
    });
    const idProps = getFieldProps('userId', {
      initialValue: this.props.searchParams.userId,
      rules: [],
    });

    //let selectedValue = opState.find(i=>i.key==parseInt(this.props.searchParams.opState))
    const opStateProps = getFieldProps('opState', {
      //value: {key: selectedValue&&selectedValue.value},
      rules: [],
    });
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    return (
      <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          <Input {...nameProps} placeholder="" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="用户id"
        >
          <InputNumber min={1} style={{ width: 200 }} {...idProps} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="状态"
        >
          <select {...opStateProps}>
            <option value="-1">不区分状态</option>
            {
              opState.map(i=>{
                let selected = i.key==parseInt(this.props.searchParams.opState) ? 'selected':''
                return <option selected={selected} value={i.key} key={i.key}>{i.value}</option>
              })
            }
          </select>
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
        </FormItem>
      </Form>
    );
  },
});

BasicDemo = createForm()(BasicDemo);

export default BasicDemo