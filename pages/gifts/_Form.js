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
      values['beginAt'] = this.state.oldNode.beginAtNice
      values['endAt'] = this.state.oldNode.endAtNice
      values['logo'] = this.state.oldNode.logo
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
      beginAt: value[0],
      endAt: value[1],
      beginAtNice: dateString[0],
      endAtNice: dateString[1]
    })
  }

  removeLogoImage() {
    changeNode('logo', null)
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

    const contentProps = getFieldProps('content', {
      initialValue: this.state.oldNode.title,
      rules: [
        //{required: true, whitespace: true, message: '请填写描述'},
      ],
    });

    const scoreProps = getFieldProps('score', {
      initialValue: this.state.oldNode.score,
      rules: [
        //{required: true, message: '请填写兑换积分数量'},
      ],
    });

    const countProps = getFieldProps('count', {
      initialValue: this.state.oldNode.count,
      rules: [
        //{required: true, message: '请填写总数量'},
      ],
    });

    const requireLevelProps = getFieldProps('requireLevel', {
      initialValue: this.state.oldNode.requireLevel,
      rules: [
        //{required: true, message: '请填写要求等级数'},
      ],
    });

    const requireFeedsCountProps = getFieldProps('requireFeedsCount', {
      initialValue: this.state.oldNode.requireFeedsCount,
      rules: [
        //{required: true, message: '请填写要求微博数'},
      ],
    });

    const requireCommentsCountProps = getFieldProps('requireCommentsCount', {
      initialValue: this.state.oldNode.requireCommentsCount,
      rules: [
        //{required: true, message: '请填写要求评论数'},
      ],
    });

    const orderNumProps = getFieldProps('orderNum', {
      initialValue: this.state.oldNode.orderNum,
      rules: [
        //{required: true, message: '请填写排序因子'},
      ],
    });

    const hideProps = getFieldProps('hide', {
      valuePropName: 'checked',
      initialValue: this.state.oldNode.hide,
      rules: [
      ],
    });

    const uploadProps = {
      name: 'logo',
      action: '/api/gifts/upload_image',
      accept: 'image',
      showUploadList: false,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          let obj = info.file.response
          that.changeNode('logo', obj.path)
          ST.info.success(`上传成功。`);
        } else if (info.file.status === 'error') {
          ST.info.error(`${info.file.name} 上传失败。`);
        }
      },
    };

    const rangeProps = {
      value: [this.state.oldNode.beginAtNice, this.state.oldNode.endAtNice],
      format: "yyyy-MM-dd HH:mm:ss",
      onChange: this.changeDate.bind(this)
    }

    return (
      <Form
        form={this.props.form}
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
          <Input type="text" {...contentProps} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="标题图片"
        >
          {
            [<Row key="row1">
              <Upload {...uploadProps}>
                <Button type="ghost">
                  <Icon type="upload" /> 点击上传
                </Button>
              </Upload>
            </Row>,
              <Row  key="row2" gup={5}>
                {
                  !this.state.oldNode.logo ? <div>暂无图片</div>:
                    <Col span={3} style={{margin: '10px 0px 10px 0px', textAlign: 'center'}}>
                      <img
                        src={this.state.oldNode.logo}
                        alt={this.state.oldNode.logo}
                        style={{width: '100px', height: '100px', border: '1px solid gray'}} />
                      <div>
                        <a onClick={this.removeLogoImage.bind(this)} href="javascript:void(0)">删除</a>
                      </div>
                    </Col>
                }
              </Row>
            ]
          }
        </FormItem>

        <FormItem
          hasFeedback
          {...formItemLayout}
          label="总数量"
        >
          <InputNumber min={1} max={1000} style={{ width: 100 }} {...countProps} />
        </FormItem>

        <FormItem
          hasFeedback
          {...formItemLayout}
          label="兑换积分数"
        >
          <InputNumber min={1} max={10000} style={{ width: 100 }} {...scoreProps} />
        </FormItem>

        <FormItem
          hasFeedback
          {...formItemLayout}
          label="要求的等级数"
        >
          <InputNumber min={1} max={100} style={{ width: 100 }} {...requireLevelProps} />
        </FormItem>

        <FormItem
          hasFeedback
          {...formItemLayout}
          label="要求的微博数"
        >
          <InputNumber min={1} max={10000} style={{ width: 100 }} {...requireFeedsCountProps} />
        </FormItem>

        <FormItem
          hasFeedback
          {...formItemLayout}
          label="要求的评论数"
        >
          <InputNumber min={1} max={10000} style={{ width: 100 }} {...requireCommentsCountProps} />
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

        <FormItem
          {...formItemLayout}
          label="是否隐藏"
        >
          <Checkbox {...hideProps}>勾选隐藏</Checkbox>
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