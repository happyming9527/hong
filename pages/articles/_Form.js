"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form} from 'antd';
import {FormWrapper, Input, InputNumber, Select, SubmitButton, SingleUploader, CheckBox, TimeRange, ValueWrapper, LogoInsert, MultiSelect} from '../../componets/FormWrapper'
import {userCategory, egcTags} from '../../Locales.js'
import FullEditor from './FullEditor.js'
import Editor from '../activities/Editor.js'
class Demo extends FormWrapper {

  formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  }

  extraProps = {
      feedType: this.props.kind == 'link' ? 2:1
  }

  render() {
    let that = this;
    const point = {
      form: this,
      node: this.props.oldNode
    }

    return (
      <Form horizontal>
        <Input {...point} label="标题" name='title' required={true}/>
        <Select {...point} label="阶段" name='userCategory' options={userCategory} required={true}/>
        <MultiSelect {...point} label="标签" name='tag' options={egcTags} />
        <LogoInsert
          {...point}
          label="标题图片"
          name="resList"
          required={true}/>
        <ValueWrapper {...point} name="content" label="内容">
          {
            this.props.kind == 'link' ? <Editor kind="link"/>:<FullEditor/>
          }
        </ValueWrapper>
        <SubmitButton {...point} canBack={true} readonly={this.props.readonly} />
      </Form>
    )
  }
};

Demo.defaultProps = {
  oldNode: {resList: [], tag: ''}
}

export default Form.create()(Demo)