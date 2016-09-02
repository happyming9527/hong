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
        <Input {...point} label="标题" name='title' max={20}/>
        <Input {...point} label="描述" name='description' max={86}/>
        <LogoInsert
          {...point}
          label="标题图片"
          name="resList"
          required={true}/>
        <TimeRange
          {...point}
          required={true}
          label="开始及结束时间"
          name={['startTimeNice','endTimeNice']}
          outPutName={['startTime','endTime']}/>
        <SubmitButton {...point} canBack={true} readonly={this.props.readonly}/>
      </Form>
    )
  }
};

Demo.defaultProps = {
  oldNode: {resList: []}
}

export default Form.create()(Demo)