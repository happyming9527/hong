"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    alert('foo')
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      console.log('收到表单值：', this.props.form.getFieldsValue());
      //ST.httpPost('/api/logins/login', values)
      //  .then(result=> {
      //    storage.setItem('userInfo', JSON.stringify(result.data))
      //    ST.history.replace('/backend')
      //    ST.info.success('登陆成功!')
      //  })
      //  .catch(e=>ST.info.error(e.message)).done
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

    let name, url, if_effective, urlWrapper, showButton

    if (node) {
      if (ot === '查看') {
        name = <p className="ant-form-text" name="name">{node.name}</p>
        url = <p className="ant-form-text" name="url">{node.url}</p>
        if_effective = <Checkbox {...getFieldProps('if_effective',  {valuePropName: 'checked', initialValue: node.is_effective}) } disabled>有效</Checkbox>
      } else if (ot === '修改') {

        name = <Input type="text" {...getFieldProps('name', { initialValue: node.name })} />
        url = <Input type="text" {...getFieldProps('pass', {initialValue: node.url })} />
        if_effective = <Checkbox {...getFieldProps('if_effective',  {valuePropName: 'checked', initialValue: node.is_effective}) }>有效</Checkbox>
        showButton = true
      } else if (ot === '新增') {
        const nameProps = getFieldProps('name', {
          rules: [
            {required: true, whitespace: true, message: '请填写名称'},
          ],
        });
        const urlProps = getFieldProps('url', {
          rules: [
            {required: true, whitespace: true, message: '请填写url'}
          ],
        });
        name = <Input type="text" {...nameProps} />
        url = <Input type="text" {...urlProps} />
        if_effective = <Checkbox {...getFieldProps('if_effective',  {valuePropName: 'checked', initialValue: true}) }>有效</Checkbox>
        showButton = true
      }

      urlWrapper = node.isFolder ? null:<FormItem
        {...formItemLayout}
        label="路由"
      >
        { url }
      </FormItem>
    }

    return (
      !node ? null:
        <Form
          horizontal
          onSubmit={this.handleSubmit}>
          <FormItem
            hasFeedback
            {...formItemLayout}
            label="名称"
          >
            {name }
          </FormItem>
          { urlWrapper }
          <FormItem
            hasFeedback
            {...formItemLayout}
            label={<span>是否有效 <Tooltip title="选中为有效,有效则会在左侧菜单栏显示,否则不显示"><Icon type="question-circle-o" /></Tooltip></span>}
          >
            {if_effective}
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