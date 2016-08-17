"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form} from 'antd';
const FormItem = Form.Item;
import {FormWrapper, Input, InputNumber, Select, SubmitButton, SingleUploader, CheckBox, TimeRange, LogoInsert} from '../../componets/FormWrapper'

class Demo extends FormWrapper {

  render() {
    let that = this;

    const point = {
      form: this,
      node: this.props.oldNode
    }

    return (
      <Form horizontal>
        <TimeRange
          {...point}
          required={true}
          label="开始及结束时间"
          name={['startDateNice','endDateNice']}
          outPutName={['startDate','endDate']}/>
        <SubmitButton {...point} canBack={true} />
      </Form>
    )
  }
};

Demo.defaultProps = {
  oldNode: {resList: []}
}

export default Form.create()(Demo)