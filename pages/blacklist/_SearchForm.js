"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form } from 'antd';
const createForm = Form.create;
import {FormWrapper, Input, InputNumber, Select, SubmitButton} from '../../componets/FormWrapper'

class BasicDemo extends  FormWrapper {

  callbackName = 'searchCallback'

  render() {

    const point = {
      form: this,
      node: this.props.searchParams
    }

    return (
      <Form horizontal>
        <Input {...point} label="用户名" name='name' />
        <InputNumber {...point} label="用户id" name='id'  min={1} style={{width: 200}}/>
        <InputNumber {...point} label="用户手机号" name='mobile' style={{width: 200}}/>
        <SubmitButton {...point}/>
      </Form>
    );
  }
}

BasicDemo = createForm()(BasicDemo);

export default BasicDemo