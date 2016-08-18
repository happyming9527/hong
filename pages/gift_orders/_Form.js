"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form } from 'antd';
import {FormWrapper, Input, InputNumber, Select, SubmitButton, SingleUploader, CheckBox, TimeRange} from '../../componets/FormWrapper'
import {expressCompany} from '../../Locales.js'

class Demo extends FormWrapper {

  formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
  }

  render() {
    const point = {
      form: this,
      node: this.props.oldNode
    }
    return (
      <Form horizontal>
        <Form.Item
          {...this.formItemLayout}
          label="收件地址及联系方式"
        >
          <p>{this.props.oldNode.accepterName||<span style={{color: 'red'}}>无联系人名称</span>}</p>
          <p>{this.props.oldNode.accepterMobile||<span style={{color: 'red'}}>无联系人电话</span>}</p>
          <p>{this.props.oldNode.accepterAddress||<span style={{color: 'red'}}>无联系地址</span>}</p>
        </Form.Item>

        <Select {...point} label="快递公司" name='expressCompany' options={expressCompany} />
        <Input {...point} label="快递单号" name='expressNo' />
        <SubmitButton {...point} canBack={true} />
      </Form>
    )
  }
};

Demo.defaultProps = {
  oldNode: {}
}

export default Form.create()(Demo)