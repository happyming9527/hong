"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form } from 'antd';
const createForm = Form.create;
import {FormWrapper, Input, InputNumber, Select, SubmitButton} from '../../componets/FormWrapper'
import ST, {SingleContainer} from '../../Setting.js'
import {addScoreReason} from '../../Locales.js'

class BasicDemo extends  FormWrapper {

  render() {

    const point = {
      form: this,
      node: this.props.node
    }

    return (
      <Form horizontal>
        <InputNumber {...point} label="返豆或扣豆数" name='score' required={true} />
        <Select {...point} label="原因" name="reason" options = {addScoreReason} required={true}/>
        <SubmitButton {...point} canBack={true}/>
      </Form>
    );
  }
}

BasicDemo.defaultProps = {
  node: {}
}

BasicDemo = createForm()(BasicDemo);

export default BasicDemo