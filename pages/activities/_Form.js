"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form, Tabs , Row, Input as AntdInput} from 'antd';
const TabPane = Tabs.TabPane;
import {FormWrapper, Input, InputNumber, Select, SubmitButton, SingleUploader, CheckBox, TimeRange, ValueWrapper, LogoInsert} from '../../componets/FormWrapper'
const FormItem = Form.Item;
import {userCategory} from '../../Locales.js'
import Editor from './Editor.js'

class Demo extends FormWrapper {


  render() {
    let that = this;
    const point = {
      form: this,
      node: this.props.oldNode
    }

    return (
      <Form horizontal>
        <Input {...point} label="标题" name='title' required={true}/>
        <Select {...point} label="阶段" name='userCategory' options={userCategory}/>
        <LogoInsert
          {...point}
          label="标题图片"
          name="resList"
          required={true}/>
        <ValueWrapper {...point} name="content" label="内容">
          <Editor/>
        </ValueWrapper>
        <SubmitButton {...point} canBack={true} />
      </Form>
    )
  }
};

Demo.defaultProps = {
  oldNode: {resList: []}
}

export default Form.create()(Demo)