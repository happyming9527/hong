"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form} from 'antd';
import ST from '../../Setting.js'
import {FormWrapper, Input, InputNumber, Select, SubmitButton, SingleUploader, CheckBox, TimeRange} from '../../componets/FormWrapper'
import {userCategory} from '../../Locales.js'

class Demo extends FormWrapper {
  render() {
    const point = {
      form: this,
      node: this.props.oldNode
    }

    return (
      <Form horizontal>
        <Input {...point} label="内容" name='content' max={20}/>
        <Select {...point} label="阶段" name="userCategory" options = {userCategory} required={true}/>
        <SubmitButton {...point} canBack={true} />
      </Form>
    )
  }
};

Demo.defaultProps = {
  oldNode: {}
}

export default Form.create()(Demo)