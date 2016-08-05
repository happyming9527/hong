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
      values['startDate'] = this.state.oldNode.startDateNice
      values['endDate'] = this.state.oldNode.endDateNice
      values['resultDate'] = this.state.oldNode.resultDateNice
      this.props.submitCallback(values)
    })
  }

  changeNode(key, value) {
    let newNode = {...this.state.oldNode}
    newNode[key] = value
    this.setState({
      oldNode: newNode
    })
  }

  changeAttribute(obj) {
    let newNode = {...this.state.oldNode}
    Object.keys(obj).forEach(i=>{
      newNode[i] = obj[i]
    })
    this.setState({
      oldNode: newNode
    })
  }

  changeDate(value, dateString) {
    this.changeAttribute({
      startDate: value[0],
      endDate: value[1],
      startDateNice: dateString[0],
      endDateNice: dateString[1]
    })
  }

  changeResultDate(value, dateString) {
    this.changeAttribute({
      resultDateNice: dateString,
      resultDate: dateString,
    })
  }

  render() {
    let that = this;
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    };

    const titleProps = getFieldProps('title', {
      initialValue: this.state.oldNode.title,
      rules: [
        {required: true, whitespace: true, message: '请填写标题'},
      ],
    });

    const paticapateRulesProps = getFieldProps('paticapateRules', {
      initialValue: this.state.oldNode.paticapateRules,
      rules: [
        {required: true, whitespace: true, message: '请填写参赛规则'},
      ],
    });

    const maxSelectProps = getFieldProps('maxSelect', {
      initialValue: this.state.oldNode.maxSelect,
      rules: [
        //{required: true, message: '请填写总数量'},
      ],
    });

    const rangeProps = {
      value: [this.state.oldNode.startDateNice, this.state.oldNode.endDateNice],
      format: "yyyy-MM-dd",
      onChange: this.changeDate.bind(this)
    }

    const rewardRulesProps = getFieldProps('rewardRules', {
      initialValue: this.state.oldNode.rewardRules,
      rules: [
        {required: true, whitespace: true, message: '请填写奖励规则'},
      ],
    })

    const selectListProps = getFieldProps('selectList', {
      initialValue: this.state.oldNode.selectList,
      rules: [
        {required: true, whitespace: true, message: '请填写选择列表'},
      ],
    })

    const postDescProps = getFieldProps('postDesc', {
      initialValue: this.state.oldNode.postDesc,
      rules: [
        {required: true, whitespace: true, message: '请填写feed前缀'},
      ],
    })

    const guidelineDescProps = getFieldProps('guidelineDesc', {
      initialValue: this.state.oldNode.guidelineDesc,
      rules: [
        {required: true, whitespace: true, message: '请填写顶部文案'},
      ],
    })


    return (
      <Form
        horizontal
        onSubmit={this.handleSubmit.bind(this)}>
        <FormItem
          hasFeedback
          {...formItemLayout}
          label="标题"
        >
          <Input type="text" {...titleProps} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="开始及结束时间"
        >
          <RangePicker
            style={{ width: 300 }}
            {...rangeProps} />
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="揭奖日期"
        >
          <DatePicker
            value={this.state.oldNode.resultDateNice}
            format={"yyyy-MM-dd"}
            style={{ width: 300 }}
            onChange={this.changeResultDate.bind(this)}
            />
        </FormItem>

        <FormItem
          hasFeedback
          {...formItemLayout}
          label="参赛规则"
        >
          <Input type="textarea" placeholder="请填写参赛规则" autosize {...paticapateRulesProps}/>
        </FormItem>

        <FormItem
          hasFeedback
          {...formItemLayout}
          label="奖励规则"
        >
          <Input type="textarea" placeholder="请填写奖励规则" autosize {...rewardRulesProps}/>
        </FormItem>

        <FormItem
          hasFeedback
          {...formItemLayout}
          label="最多选择数量"
        >
          <InputNumber min={1} max={9} style={{ width: 100 }} {...maxSelectProps} />
        </FormItem>

        <FormItem
          hasFeedback
          {...formItemLayout}
          label="选择列表"
        >
          <Input type="textarea" placeholder="请填写选择列表,以|符号分隔" autosize {...selectListProps}/>
        </FormItem>

        <FormItem
          hasFeedback
          {...formItemLayout}
          label="feed前缀"
        >
          <Input type="textarea" placeholder="请填写feed的前缀" autosize {...postDescProps}/>
        </FormItem>

        <FormItem
          hasFeedback
          {...formItemLayout}
          label="顶部文案"
        >
          <Input type="textarea" placeholder="请填写顶部文案" autosize {...guidelineDescProps}/>
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