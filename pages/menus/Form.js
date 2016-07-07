"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import ST from '../../Setting.js'

let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      if (this.props.operationType === '修改') {
        ST.httpPost('/api/menus/modify', {id: this.props.currentNode.id, data: values})
          .then(result=> {
            this.props.changeCallback(result.data)
            ST.info.success(result.text)
          })
          .catch(e=>ST.info.error(e.message)).done
      } else if (this.props.operationType === '新增') {
        ST.httpPost('/api/menus/add', {parent_id: this.props.currentNode.id, data: values})
          .then(result=> {
            this.props.changeCallback(result.data)
            ST.info.success(result.text)
          })
          .catch(e=>ST.info.error(e.message)).done
      }
    })
  },

  render() {
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    let node = this.props.currentNode
    let ot = this.props.operationType

    let name, url, is_effective, urlWrapper, showButton, parentName

    if (node) {
      if (ot === '查看') {
        name = <p className="ant-form-text" name="name">{node.name}</p>
        url = <p className="ant-form-text" name="url">{node.url}</p>
        is_effective = <Checkbox {...getFieldProps('is_effective',  {valuePropName: 'checked', initialValue: node.is_effective}) } disabled>有效</Checkbox>
      } else {
        if (ot === '修改') {
          const nameProps = getFieldProps('name', {
            initialValue: node.name,
            rules: [
              {required: true, whitespace: true, message: '请填写名称'},
            ],
          });
          const urlProps = getFieldProps('url', {
            initialValue: node.url,
            rules: [
              //{required: true, whitespace: true, message: '请填写url'}
            ],
          });
          const isEffectiveProps = getFieldProps('is_effective',  {
            valuePropName: 'checked',
            initialValue: node.is_effective
          })
          name = <Input type="text" {...nameProps} />
          url = <Input type="text" {...urlProps} />
          is_effective = <Checkbox {...isEffectiveProps }>有效</Checkbox>
          showButton = true
        } else if (ot === '新增') {
          const nameProps = getFieldProps('name', {
            rules: [
              {required: true, whitespace: true, message: '请填写名称'},
            ],
          });
          const urlProps = getFieldProps('url', {
            rules: [
              //{required: true, whitespace: true, message: '请填写url'}
            ],
          });
          const isEffectiveProps = getFieldProps('is_effective',  {
            valuePropName: 'checked',
            initialValue: true
          })
          name = <Input type="text" {...nameProps} />
          url = <Input type="text" {...urlProps} />
          is_effective = <Checkbox {...isEffectiveProps }>有效</Checkbox>
          showButton = true
        }
      }

      urlWrapper = node.isFolder ? null:
        <FormItem
          {...formItemLayout}
          label="路由"
        >
        { url }
      </FormItem>

      parentName = ot!=='新增' ? null:
        <FormItem
          {...formItemLayout}
          label="父节点名称"
        >
          <p className="ant-form-text" name="name">{node.name}</p>
        </FormItem>
    }

    return (
      !node ? null:
        <Form
          form={this.props.form}
          horizontal
          onSubmit={this.handleSubmit}>

          { parentName }
          <FormItem
            hasFeedback
            {...formItemLayout}
            label="名称"
          >
            {name }
          </FormItem>
          { urlWrapper }
          <FormItem
            {...formItemLayout}
            label={<span>是否有效 <Tooltip title="选中为有效,有效则会在左侧菜单栏显示,否则不显示" ><Icon  type="question-circle-o" style={{color: 'red'}} /></Tooltip></span>}
          >
            {is_effective}
          </FormItem>
          {
            !showButton ? null:
              <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                <Button type="primary" htmlType="submit">确定</Button>
              </FormItem>
          }

        </Form>
    );
  },
});

Demo = Form.create()(Demo);
export default Demo