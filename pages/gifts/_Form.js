"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form } from 'antd';
import {FormWrapper, Input, InputNumber, Select, SubmitButton, SingleUploader, CheckBox, TimeRange} from '../../componets/FormWrapper'

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
        <Input {...point} type="textarea" label="描述" name='content' required={true}/>
        <InputNumber {...point} label="总数量" name='count' min={1} max={1000} required={true}/>
        <InputNumber {...point} label="兑换积分数" name='score' min={0} max={10000}/>
        <InputNumber {...point} label="价格" name='price' min={1} max={10000} required={true}/>
        <InputNumber {...point} label="要求用户等级" name='requireLevel' min={0} max={10000}/>
        <InputNumber {...point} label="要求发帖数" name='requireFeedsCount' min={0} max={10000}/>
        <InputNumber {...point} label="排序因子" name='orderNum' min={0} max={10000}/>
        <SingleUploader {...point} label="标题图片" url='/api/gifts/upload_image' name="logo" required={true}/>
        <TimeRange
          {...point}
          required={true}
          label="开始及结束时间"
          name={['beginAtNice','endAtNice']}
          outPutName={['beginAt','endAt']}/>
        <CheckBox {...point} name="display" label="发布" />
        <SubmitButton {...point} canBack={true} readonly={this.props.readonly}/>
      </Form>
    )
  }
};

Demo.defaultProps = {
  oldNode: {}
}

export default Form.create()(Demo)