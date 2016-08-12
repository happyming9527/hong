"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, Tabs, Row, Col , Select, DatePicker} from 'antd';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;
import ST from '../../Setting.js'
import Atts from '../Attachments.js'

class Demo extends React.Component {

  constructor(props) {
    super(props)
    this.categories = [{key: 1, value: '备孕'}, {key: 2, value: '孕期'}, {key: 3, value: '已生'}]
    this.state = {
      startTimeNice: this.props.oldNode.startTimeNice,
      endTimeNice: this.props.oldNode.endTimeNice,
      resList: this.props.oldNode.resList.slice(),
      userCategory: this.props.oldNode.userCategory
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.oldNode !== nextProps.oldNode) {
      let userCategory = this.categories.find(i=>i.key==nextProps.oldNode.userCategory)
      this.setState({
        startTimeNice: nextProps.oldNode.startTimeNice,
        endTimeNice: nextProps.oldNode.endTimeNice,
        resList: nextProps.oldNode.resList.slice(),
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
      if (this.props.kind=='egc') {
        values['feedType'] = 1
      } else {
        values['feedType'] = 2
      }
      values['userCategory'] = this.state.userCategory
      values['resList'] = this.state.resList
      values['startTime'] = this.state.startTimeNice
      values['endTime'] = this.state.endTimeNice
      this.props.submitCallback(values)
    })
  }

  openModal() {
    this.attachment.toggle()
  }

  confirmMedia(result) {
    let list = this.state.resList.slice()
    list.push({
      resType: 1,
      content: result
    })
    this.setState({
      resList: list
    })
  }

  changeCategory(value) {
    this.setState({
      userCategory: value
    })
  }

  removeLogoImage(image) {
    let newList = this.state.resList.filter(i=>{
      return i !== image
    })
    this.setState({
      resList: newList
    })
  }

  changeDate(value, dateString) {
    debugger
    this.setState({
      startTimeNice: dateString[0],
      endTimeNice: dateString[1]
    })
  }

  render() {
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    };

    const titleProps = getFieldProps('title', {
      initialValue: this.props.oldNode.title,
      rules: [
        {required: true, whitespace: true, message: '请填写标题'},
      ],
    });

    const rangeProps = {
      value: [this.state.startTimeNice, this.state.endTimeNice],
      format: "yyyy-MM-dd HH:mm",
      onChange: this.changeDate.bind(this)
    }

    //const rangeProps = {
    //  value: ['1992-11-1 00:30', '2016-12-3 00:30'],
    //  format: "yyyy-MM-dd HH:mm",
    //  onChange: this.changeDate.bind(this)
    //}

    const descProps = getFieldProps('description', {
      initialValue: this.props.oldNode.title,
      rules: [
        {required: true, whitespace: true, message: '请填写描述'},
      ],
    });

    let content

    if (this.props.kind == 'link') {
      const contentProps = getFieldProps('content', {
        initialValue: this.props.oldNode.content,
        rules: [
          {required: true, whitespace: true, message: '请填写链接'},
        ],
      });
      content = <FormItem
        {...formItemLayout}
        label="链接"
      >
        <Input type="text" {...contentProps} />
      </FormItem>
    } else if (this.props.kind == 'egc') {
      content = <FormItem
        {...formItemLayout}
        label="内容"
      >
        <Input type="text" placeholder="请黏贴文案" />
      </FormItem>
    }

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
          hasFeedback
          {...formItemLayout}
          label="描述"
        >
          <Input type="text" {...descProps} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="标题图片"
        >
          <Atts ref={i=>this.attachment=i} submitCallback={this.confirmMedia.bind(this)} attachmentKind={'image'} />
          {
            [<Row key="row1">
              <Button type="primary" onClick={this.openModal.bind(this)}>插入图片</Button>
            </Row>,
              <Row  key="row2" gup={5}>
                {
                  !this.state.resList ? <div>暂无标题图片</div>:
                    this.state.resList.map(
                      (i, index)=>{
                        return (
                          <Col span={3} key={index} style={{margin: '10px 0px 10px 0px', textAlign: 'center'}}>
                            <img
                              src={i.content}
                              alt={i.content}
                              style={{width: '100px', height: '100px', border: '1px solid gray'}} />
                            <div>
                              <a onClick={this.removeLogoImage.bind(this, i)} href="javascript:void(0)">删除</a>
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

        <FormItem
          {...formItemLayout}
          label="开始及结束时间"
        >
          <RangePicker
            style={{ width: 300 }}
            showTime
            {...rangeProps} />
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
  oldNode: {resList: []}
}

export default Form.create()(Demo)