"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, InputNumber, Select } from 'antd';
const Option = Select.Option;

const createForm = Form.create;
const FormItem = Form.Item;
import ST from '../../Setting.js'
import {ReportedFeedState} from '../../Locales'

function noop() {
  return false;
}

let BasicDemo = React.createClass({

  getInitialState() {
    return  {
      searchParams: this.props.searchParams
    }
  },

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
      values['reportState'] = this.state.searchParams.reportState
      that.props.searchCallback(values)
    });
  },

  reportStateChange(value) {
    let searchParams = {...this.state.searchParams, reportState: value}
    this.setState({
      searchParams: searchParams
    })
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
    const reportStateProps = getFieldProps('reportState', {
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
          <Select
            value={[parseInt(this.state.searchParams.reportState)||'0']}
            onChange={this.reportStateChange}
          >
            <Select.Option value="0">不区分状态</Select.Option>
            {
              ReportedFeedState.map(i=>{
                return <Select.Option value={i.key} key={i.key}>{i.value}</Select.Option>
              })
            }
          </Select>
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