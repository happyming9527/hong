"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form } from 'antd';
const createForm = Form.create;
import {FormWrapper, Input, InputNumber, Select, SubmitButton} from '../../componets/FormWrapper'
import ST, {SingleContainer} from '../../Setting.js'

class BasicDemo extends  FormWrapper {

  render() {

    const point = {
      form: this,
      node: this.props.node
    }

    return (
      <Form horizontal>
        <Input {...point} label="手机号" name='mobile' required={true}/>
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