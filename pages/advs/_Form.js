"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form, Tabs , Row, Input as AntdInput} from 'antd';
const TabPane = Tabs.TabPane;
import {FormWrapper, Input, InputNumber, Select, SubmitButton, SingleUploader, CheckBox, TimeRange, ValueWrapper, LogoInsert} from '../../componets/FormWrapper'

class Demo extends FormWrapper {

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
        <Input {...point} label="描述" name='description' required={true}/>
        <Input {...point} label="广告主名称" name='userName'/>
        <SingleUploader {...point} label="广告主头像" url='/api/advs/upload_image' name="userLogo"/>
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
        <Input {...point} label="广告链接" name='link' required={true}/>
        <SubmitButton {...point} canBack={true} />
      </Form>
    )
  }
};

Demo.defaultProps = {
  oldNode: {resList: []}
}

export default Form.create()(Demo)