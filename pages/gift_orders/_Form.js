"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, Tabs, Row, Col , Select, Upload, InputNumber, RadioGroup, DatePicker} from 'antd';
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
import ST from '../../Setting.js'

class Demo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      oldNode: this.props.oldNode
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.oldNode !== nextProps.oldNode) {
      this.setState({
        oldNode: nextProps.oldNode
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      this.props.submitCallback(values)
    })
  }


  render() {
    let that = this;
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    };

    const expressCompanyProps = getFieldProps('expressCompany', {
      rules: [
        {required: true, whitespace: true, message: '快递公司'},
      ],
    });

    const expressNoProps = getFieldProps('expressNo', {
      rules: [
        {required: true, whitespace: true, message: '请填写快递单号'},
      ],
    });


    return (
      <Form
        form={this.props.form}
        horizontal
        onSubmit={this.handleSubmit.bind(this)}>

        <FormItem
          {...formItemLayout}
          label="收件地址及联系方式"
        >
          <p>{this.state.oldNode.accepterName||<span style={{color: 'red'}}>无联系人名称</span>}</p>
          <p>{this.state.oldNode.accepterMobile||<span style={{color: 'red'}}>无联系人电话</span>}</p>
          <p>{this.state.oldNode.accepterAddress||<span style={{color: 'red'}}>无联系地址</span>}</p>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="快递公司"
        >
          <Select defaultValue="1" style={{ width: 120 }} {...expressCompanyProps}>
            {
              ST.Locales.expressCompany.map(i=>{
                return <Option value={i.key} key={i.key}>{i.value}</Option>
              })
            }
          </Select>
        </FormItem>
        <FormItem
          hasFeedback
          {...formItemLayout}
          label="快递单号"
        >
          <Input type="text" {...expressNoProps} />
        </FormItem>

        <FormItem wrapperCol={{ span: 21, offset: 3 }} style={{ marginTop: 24 }}>
          {
            this.props.readonly ? null:<Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>确定</Button>
          }
          <Button type="ghost" onClick={ST.historyGoBack}>返回</Button>
        </FormItem>

      </Form>
    );
  }
};

Demo.defaultProps = {
  oldNode: {}
}

export default Form.create()(Demo)