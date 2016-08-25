"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Row, Col, Icon, Upload, DatePicker, Checkbox as AntdCheckbox, Form as AntdForm, Input as AntdInput, InputNumber as AntdInputNumber, Select as AntdSelect } from 'antd'
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;
import ST from '../Setting.js'
import Atts from '../pages/Attachments.js'
const FormItem = AntdForm.Item;

export class FormWrapper extends React.Component {
  callbackName='submitCallback'

  componentWillReceiveProps(nextProps) {
    return false
  }

  extraProps = {}

  handleSubmit = (e)=>{
    let that = this;
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }

      Object.keys(this.extraProps).forEach(i=>{
        values[i] = this.extraProps[i];
      })

      if (this.WrappedHiddenValues) {
        Object.keys(this.WrappedHiddenValues).forEach(i=>{
          values[i] = this.WrappedHiddenValues[i];
        })
      }

      let boolean = true
      if (this.WrappedHiddenValidateComponent && this.WrappedHiddenValidateComponent.length>0) {
        this.WrappedHiddenValidateComponent.forEach(i=>{
          boolean = boolean && i.validateSelf()
        })
      }
      if (!boolean) {
        return false
      }

      console.log(values);
      that.props[this.callbackName](values)
    });
  }

  formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
  }
}

class CommonComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.node[this.props.name],
      isValid: true
    }
    this.setFormData(this.props.node[this.props.name])
    if (this.props.required) {
      this.addValidate()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.node !== nextProps.node) {
      this.state = {
        isValid: true,
        value: nextProps.node[this.props.name]
      }
      this.setFormData(nextProps.node[this.props.name])
    }
  }

  addValidate(){
    if ( !this.props.form.WrappedHiddenValidateComponent ) {
      this.props.form.WrappedHiddenValidateComponent = []
    }
    this.props.form.WrappedHiddenValidateComponent.push(this)
  }

  setFormData(value){
    if ( !this.props.form.WrappedHiddenValues ) {
      this.props.form.WrappedHiddenValues = {}
    }
    this.props.form.WrappedHiddenValues[this.props.name] = value
  }

  onValueChange(value, callback=()=>{}){
    this.setState({
      value: value
    }, callback)
    this.setFormData(value)
  }
}

export class Input extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form.props.form;
    let rules = []
    if (this.props.required) {
      rules = [{required: true, message: `请填写${this.props.label}`}]
    } else if (this.props.max) {
      rules = [{required: true, max: this.props.max, message: `请填写最多${this.props.max}个字符`}]
    } else if (this.props.min) {
      rules = [{required: true, min: this.props.min, message: `请填写最少${this.props.min}个字符`}]
    }

    const passedProps = getFieldProps(this.props.name, {
      initialValue: this.props.node[this.props.name],
      rules: rules,
    });
    return <FormItem
      {...this.props.form.formItemLayout}
      label={this.props.label}
    >
      <AntdInput {...passedProps} {...this.props} placeholder="" />
    </FormItem>
  }
}

export class CheckBox extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form.props.form;
    const passedProps = getFieldProps(this.props.name, {
      valuePropName: 'checked',
      initialValue: this.props.node[this.props.name],
      rules: [],
    });

    return <FormItem
      {...this.props.form.formItemLayout}
      label={this.props.label}
    >
      <AntdCheckbox {...passedProps}>{this.props.label}</AntdCheckbox>
    </FormItem>
  }
}

export class InputNumber extends CommonComponent {
  validateSelf() {
    let value = this.props.form.props.form.getFieldValue(this.props.name)
    if (value) {
      this.setState({
        isValid: true,
        value: value
      })
      return true
    } else {
      this.setState({
        isValid: false,
        value: value
      })
      return false
    }
  }

  onValueChange(value) {
    super.onValueChange(value)
    this.validateSelf()
  }

  onBlur() {
    let value = this.props.form.props.form.getFieldValue(this.props.name)
    super.onValueChange(value)
    this.validateSelf()
  }


  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form.props.form;
    const passedProps = getFieldProps(this.props.name, {
      initialValue: this.state.value,
      rules: [],
    });

    let helper = !this.props.required||this.state.isValid ? {}:{help: `请填写${this.props.label}`, validateStatus: 'error'}
    return (
      <FormItem
        {...helper}
        required={this.props.required}
        {...this.props.form.formItemLayout}
        label={this.props.label}>
        <AntdInputNumber
          {...passedProps}
          onBlur={this.onBlur.bind(this)}
          {...this.props}/>
      </FormItem>
    )
  }
}

export class ValueWrapper extends CommonComponent {
  validateSelf = () => {
    let value = this.state.value
    if (value) {
      this.setState({
        isValid: true,
        value: value
      })
      return true
    } else {
      this.setState({
        isValid: false,
        value: value
      })
      return false
    }
  }

  onValueChange(value) {
    this.setState({
      value: value
    }, this.validateSelf)
    this.setFormData(value)
  }

  setFormValue(value) {
    this.setFormData(value)
  }

  render() {
    let helper = !this.props.required||this.state.isValid ? {}:{help: `请填写${this.props.label}`, validateStatus: 'error'}
    return (
      <FormItem
        {...helper}
        required={this.props.required}
        {...this.props.form.formItemLayout}
        label={this.props.label}>
        {
          React.cloneElement(this.props.children, {onValueChange: this.onValueChange.bind(this), initialValue: this.state.value})
        }
      </FormItem>
    )
  }
}


export class Select extends CommonComponent {

  validateSelf() {
    let value = this.state.value
    if (value) {
      this.setState({
        isValid: true,
        value: value
      })
      return true
    } else {
      this.setState({
        isValid: false,
        value: value
      })
      return false
    }
  }

  onValueChange(value) {
    this.setState({
      value: value
    }, this.validateSelf)
    this.setFormData(value)

  }

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form.props.form;
    let value = this.state.value != null ? [this.state.value]:[]
    let helper = !this.props.required||this.state.isValid ? {}:{help: `请填写${this.props.label}`, validateStatus: 'error'}
    return (
      <FormItem
        {...helper}
        required={this.props.required}
        {...this.props.form.formItemLayout}
        label={this.props.label}>

        <AntdSelect
          value={value}
          onChange={this.onValueChange.bind(this)} >
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

export class MultiSelect extends CommonComponent {
  constructor(props) {
    super(props)
    let value = this.props.node[this.props.name]
    if (value) {
      value= value.split(',')
    } else {
      value = []
    }
    this.state = {
      value: value,
      isValid: true
    }
    this.setFormData(value)
    if (this.props.required) {
      this.addValidate()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.node !== nextProps.node) {
      let value = nextProps.node[this.props.name]
      if (value) {
        value= value.split(',')
      } else {
        value = []
      }
      this.state = {
        isValid: true,
        value: value
      }
      this.setFormData(value)
    }
  }

  validateSelf() {
    let value = this.state.value
    if (value && value.length > 0) {
      this.setState({
        isValid: true,
        value: value
      })
      return true
    } else {
      this.setState({
        isValid: false,
        value: value
      })
      return false
    }
  }

  setFormData(value){
    if ( !this.props.form.WrappedHiddenValues ) {
      this.props.form.WrappedHiddenValues = {}
    }
    if (value instanceof Array) {
      value = value.join(',')
    }
    this.props.form.WrappedHiddenValues[this.props.name] = value
  }

  onValueChange(value) {
    this.setState({
      value: value
    }, this.validateSelf)
    this.setFormData(value)

  }

  render() {

    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form.props.form;
    let helper = !this.props.required||this.state.isValid ? {}:{help: `请填写${this.props.label}`, validateStatus: 'error'}
    return (
      <FormItem
        {...helper}
        required={this.props.required}
        {...this.props.form.formItemLayout}
        label={this.props.label}>

        <AntdSelect
          tags
          value={this.state.value}
          onChange={this.onValueChange.bind(this)} >
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

export class TimeRange extends React.Component {
  constructor(props) {
    super(props)
    let firstValue = this.props.node[this.props.name[0]]
    let secondValue = this.props.node[this.props.name[1]]
    this.state = {
      isValid: true,
      firstValue: firstValue,
      secondValue: secondValue
    }
    this.setFormData([firstValue, secondValue])
    if (this.props.required) {
      this.addValidate()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.node !== nextProps.node) {
      let firstValue = nextProps.node[this.props.name[0]]
      let secondValue = nextProps.node[this.props.name[1]]
      this.setState({
        firstValue: firstValue,
        secondValue: secondValue
      })
      this.setFormData([firstValue, secondValue])
    }
  }

  validateSelf() {
    let firstValue = this.state.firstValue
    let secondValue = this.state.secondValue
    if (firstValue && secondValue) {
      this.setState({
        isValid: true,
        firstValue: firstValue,
        secondValue: secondValue
      })
      return true
    } else {
      this.setState({
        isValid: false,
        firstValue: firstValue,
        secondValue: secondValue
      })
      return false
    }
  }

  addValidate(){
    if ( !this.props.form.WrappedHiddenValidateComponent ) {
      this.props.form.WrappedHiddenValidateComponent = []
    }
    this.props.form.WrappedHiddenValidateComponent.push(this)
  }

  setFormData = (value)=>{
    if ( !this.props.form.WrappedHiddenValues ) {
      this.props.form.WrappedHiddenValues = {}
    }
    if (this.props.outPutName) {
      this.props.form.WrappedHiddenValues[this.props.outPutName[0]] = value[0]
      this.props.form.WrappedHiddenValues[this.props.outPutName[1]] = value[1]
    } else {
      this.props.form.WrappedHiddenValues[this.props.name[0]] = value[0]
      this.props.form.WrappedHiddenValues[this.props.name[1]] = value[1]
    }

  }

  onTimeChange = (_, value)=>{
    this.setState({
      firstValue: value[0],
      secondValue: value[1]
    }, this.validateSelf)
    this.setFormData(value)
  }

  setFromNow = ()=> {
    let firstValue = this.state.firstValue
    let lastValue = this.state.secondValue
    if (!this.state.firstValue) {
      firstValue = moment();
      lastValue = firstValue.clone().add(1, 'days');
      firstValue = this.format(firstValue);
      lastValue = this.format(lastValue);
    }
    let sufix = moment().format('hh:mm:ss')
    firstValue = firstValue.split(' ')[0]
    lastValue = lastValue.split(' ')[0]
    let firstValueString = firstValue + ' ' + sufix
    let lastValueString = lastValue + ' ' + sufix
    this.setState({
      firstValue: firstValueString,
      secondValue: lastValueString
    })
    this.setState({
    })
  }

  setFromNight = ()=> {
    let firstValue = this.state.firstValue
    let lastValue = this.state.secondValue
    if (!this.state.firstValue) {
      firstValue = moment();
      lastValue = firstValue.clone().add(1, 'days');
      firstValue = this.format(firstValue);
      lastValue = this.format(lastValue);
    }
    let firstSufix = '00:00:00'
    let lastSufix = '23:59:59'
    firstValue = firstValue.split(' ')[0]
    lastValue = lastValue.split(' ')[0]
    let firstValueString = firstValue + ' ' + firstSufix
    let lastValueString = lastValue + ' ' + lastSufix
    this.setState({
      firstValue: firstValueString,
      secondValue: lastValueString
    })
  }

  format = (date)=>{
    return date.format('YYYY-MM-DD hh:mm:ss')
  }

  setDate(day) {
    let firstValue = moment();
    let lastValue = firstValue.clone().add(day, 'days');
    let firstValueString = this.format(firstValue);
    let lastValueString = this.format(lastValue);
    this.setState({
      firstValue: firstValueString,
      secondValue: lastValueString
    })
  }

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form.props.form;

    const rangeProps = {
      value: [this.state.firstValue, this.state.secondValue],
      format: "yyyy-MM-dd HH:mm:ss",
      onChange: this.onTimeChange
    }

    let helper = !this.props.required||this.state.isValid ? {}:{help: `请填写${this.props.label}`, validateStatus: 'error'}
    return (

      <Row>
        <FormItem
          {...helper}
          required={this.props.required}
          {...this.props.form.formItemLayout}
          label={this.props.label}>
          <a href="javascript:void(0)" onClick={this.setDate.bind(this, 1)}>1天</a> | <a href="javascript:void(0)" onClick={this.setDate.bind(this, 2)} >2天</a> | <a href="javascript:void(0)" onClick={this.setDate.bind(this, 3)}>3天</a> | <a href="javascript:void(0)" onClick={this.setDate.bind(this, 7)}>7天</a> | <a href="javascript:void(0)" onClick={this.setDate.bind(this, 14)}>14天</a> | <a href="javascript:void(0)" onClick={this.setDate.bind(this, 30)}>30天</a>| <a href="javascript:void(0)" onClick={this.setFromNight }>凌晨起始</a> | <a href="javascript:void(0)" onClick={this.setFromNow}>现在起始</a>
          <RangePicker
            style={{ width: 300 }}
            showTime
            {...rangeProps} />
        </FormItem>
      </Row>

    )
  }
}

export class SingleUploader extends CommonComponent {

  validateSelf() {
    let value = this.state.value
    if (value) {
      this.setState({
        isValid: true,
        value: value
      })
      return true
    } else {
      this.setState({
        isValid: false,
        value: value
      })
      return false
    }
  }


  removeLogo = ()=> {
    this.setState({
      value: null
    }, this.validateSelf)
    this.setFormData(null)
  }

  render() {
    const that = this
    const uploadProps = {
      name: 'logo',
      action: this.props.url,
      accept: 'image',
      showUploadList: false,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          let obj = info.file.response
          that.onValueChange(obj.path)
          ST.info.success(`上传成功。`);
          that.validateSelf();
        } else if (info.file.status === 'error') {
          ST.info.error(`${info.file.name} 上传失败。`);
        }
      },
    };

    let helper = !this.props.required||this.state.isValid ? {}:{help: `请设置${this.props.label}`, validateStatus: 'error'}

    return (
      <FormItem
        {...helper}
        required={this.props.required}
        {...this.props.form.formItemLayout}
        label={this.props.label}>
          {
            [<Row key="uploaderRow1">
              <Upload {...uploadProps}>
                <Button type="ghost">
                  <Icon type="upload" /> 点击上传
                </Button>
              </Upload>
            </Row>,
              <Row key="uploaderRow2" gup={5}>
                {
                  !this.state.value ? <div>暂无图片</div>:
                    <Col span={3} style={{margin: '10px 0px 10px 0px', textAlign: 'center'}}>
                      <img
                        src={this.state.value}
                        alt={this.state.value}
                        style={{width: '100px', height: '100px', border: '1px solid gray'}} />
                      <div>
                        <a onClick={this.removeLogo} href="javascript:void(0)">删除</a>
                      </div>
                    </Col>
                }
              </Row>
            ]
          }
      </FormItem>
    )
  }
}

export class LogoInsert extends CommonComponent {

  validateSelf() {
    let value = this.state.value
    if (value && value.length>0) {
      this.setState({
        isValid: true,
        value: value
      })
      return true
    } else {
      this.setState({
        isValid: false,
        value: value
      })
      return false
    }
  }

  removeLogo(ele) {
    let newValue = []
    let oldValue = this.state.value||[]
    oldValue.forEach(i=>{
      if (i != ele) {
        newValue.push(i)
      }
    })
    this.setState({
      value: newValue
    }, this.validateSelf)
    this.setFormData(newValue)
  }

  openModal() {
    this.attachment.toggle()
  }

  confirmMedia = (result)=> {
    let list = this.state.value.slice()
    list.push({
      resType: 1,
      content: result
    })
    this.setState({
      value: list
    }, this.validateSelf)
    this.setFormData(list)
  }

  render() {
    const that = this

    let helper = !this.props.required||this.state.isValid ? {}:{help: `请设置${this.props.label}`, validateStatus: 'error'}

    return (
      <FormItem
        {...helper}
        required={this.props.required}
        {...this.props.form.formItemLayout}
        label={this.props.label}>
        <Atts ref={i=>this.attachment=i} submitCallback={this.confirmMedia} attachmentKind={'image'} />
        {
          [<Row key="LogoInsertRow1">
            <Button type="primary" onClick={this.openModal.bind(this)}>插入图片</Button>
          </Row>,
            <Row  key="LogoInsertRow2" gup={5}>
              {
                !this.state.value ? <div>暂无标题图片</div>:
                  this.state.value.map(
                    (i, index)=>{
                      return (
                        <Col span={8} key={index} style={{margin: '10px 0px 10px 0px', textAlign: 'center'}}>
                          <img
                            src={i.content}
                            alt={i.content}
                            style={{width: '100px', height: '100px', border: '1px solid gray'}} />
                          <div>
                            <a onClick={this.removeLogo.bind(this, i)} href="javascript:void(0)">删除</a>
                          </div>
                        </Col>
                      )
                    }
                  )
              }
            </Row>
          ]
        }
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
      {
        this.props.readonly ? null:
          <Button type="primary" onClick={this.props.form.handleSubmit}>确定</Button>
      }

      {
        !this.props.canBack ? null:<Button type="ghost" style={{marginLeft: 10}} onClick={ST.historyGoBack}>返回</Button>
      }

    </FormItem>
    )
  }
}

