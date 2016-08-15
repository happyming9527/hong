"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
import {opState} from '../../Locales'
import {FormWrapper, Input, InputNumber, Select, SubmitButton} from '../../componets/FormWrapper'

class BasicDemo extends  FormWrapper {

  render() {

    const point = {
      form: this,
      node: this.props.searchParams
    }
    return (
      <Form horizontal>

        <Input {...point} label="用户名" name='userName' />
        <InputNumber {...point} label="用户id" name='userId'  min={1} style={{width: 200}}/>
        <Select {...point} label="状态" name='opState' options={opState}/>

        <SubmitButton {...point}/>
      </Form>
    );
  }
}

BasicDemo = createForm()(BasicDemo);

export default BasicDemo