"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form as AntdForm, Input as AntdInput, InputNumber as AntdInputNumber, Select as AntdSelect } from 'antd';
const FormItem = AntdForm.Item;

export class FormWrapper extends React.Component {

  componentWillReceiveProps(nextProps) {
    return false
  }

  handleSubmit = (e)=>{
    let that = this;
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      if (this.WrappedHiddenValues) {
        Object.keys(this.WrappedHiddenValues).forEach(i=>{
          values[i] = this.WrappedHiddenValues[i];
        })
      }
      console.log(values);
      that.props.searchCallback(values)
    });
  }

  formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
  }
}

export class Input extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form.props.form;
    const passedProps = getFieldProps(this.props.name, {
      initialValue: this.props.node[this.props.name],
      rules: [],
    });
    return <FormItem
      {...this.props.form.formItemLayout}
      label={this.props.label}
    >
      <AntdInput {...passedProps} placeholder="" />
    </FormItem>
  }
}

export class InputNumber extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form.props.form;
    const passedProps = getFieldProps(this.props.name, {
      initialValue: this.props.node[this.props.name],
      rules: [],
    });

    return (
      <FormItem
      {...this.props.form.formItemLayout}
      label={this.props.label}>
        <AntdInputNumber {...passedProps} {...this.props} />
    </FormItem>
    )
  }
}

export class Select extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.node[this.props.name]
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.node !== nextProps.node) {
      this.state = {
        value: nextProps.node[this.props.name]
      }
    }
  }

  setFormData = (value)=>{
    if ( !this.props.form.WrappedHiddenValues ) {
      this.props.form.WrappedHiddenValues = {}
    }
    this.props.form.WrappedHiddenValues[this.props.name] = value
  }

  onSelectChange = (value)=>{
    this.setState({
      value: value
    })
    this.setFormData(value)
  }

  render() {

    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form.props.form;
    let value = this.state.value != null ? [parseInt(this.state.value)]:[]
    return (
      <FormItem
        {...this.props.form.formItemLayout}
        label={this.props.label}>

        <AntdSelect
          value={value}
          onChange={this.onSelectChange} >
          {
            this.props.options.map(i=>{
              return <AntdSelect.Option value={i.key} key={i.key}>{i.value}</AntdSelect.Option>
            })
          }
        </AntdSelect>

      </FormItem>
    )
  }
}

export class SubmitButton extends React.Component {

  render() {
    const offset = this.props.form.formItemLayout.labelCol.span
    const span = this.props.form.formItemLayout.wrapperCol.span
    return (
    <FormItem wrapperCol={{ span: span, offset: offset }}>
      <Button type="primary" onClick={this.props.form.handleSubmit}>确定</Button>
    </FormItem>
    )
  }
}

