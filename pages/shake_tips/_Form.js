"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, Tabs, Row, Col , Select} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
import ST from '../../Setting.js'
import Atts from '../Attachments.js'
import RichEditorPreview from '../articles/RichEditorPreview.js'

class Demo extends React.Component {

  constructor(props) {
    super(props)
    this.categories = [{key: 1, value: '备孕'}, {key: 2, value: '怀孕'}, {key: 3, value: '生产'}]
    this.state = {
      userCategory: this.props.oldNode.userCategory
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.oldNode !== nextProps.oldNode) {
      let userCategory = this.categories.find(i=>i.key==nextProps.oldNode.userCategory)
      this.setState({
        userCategory: userCategory&&userCategory.value
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      values['userCategory'] = this.state.userCategory
      this.props.submitCallback(values)
    })
  }

  changeCategory(value) {
    this.setState({
      userCategory: value
    })
  }


  render() {
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    };

    const contentProps = getFieldProps('content', {
      initialValue: this.props.oldNode.content,
      rules: [
        {required: true, whitespace: true, message: '请填写内容'},
      ],
    });

    return (
      <Form
        form={this.props.form}
        horizontal
        onSubmit={this.handleSubmit.bind(this)}>
        <FormItem
          hasFeedback
          {...formItemLayout}
          label="内容"
        >
          <Input type="text" {...contentProps} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="阶段"
        >
          <Select
            value={this.state.userCategory}
            style={{ width: '100%' }}
            onChange={this.changeCategory.bind(this)}
          >
            {
              this.categories.map(i=>{
                return <Option key={i.key}>{i.value}</Option>
              })
            }
          </Select>
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