"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon, Tabs, Row, Col , Select} from 'antd';
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

  render() {
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    };

    console.log(this.state.selfTags)
    return (
      <Form
        form={this.props.form}
        horizontal>
        <FormItem
          hasFeedback
          {...formItemLayout}
          label="用户名"
        >
          <p className="ant-form-text" name="name">{this.props.oldNode.userName}</p>
        </FormItem>
        <FormItem
          hasFeedback
          {...formItemLayout}
          label="内容"
        >
          <p className="ant-form-text" name="name">{this.props.oldNode.content}</p>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="资源"
        >
          {
            <Row gup={5}>
              {
                !this.props.oldNode.resList ? <div>无资源</div>:
                  this.props.oldNode.resList.map(
                    (i, index)=>{
                      return (
                        <Col span={6} key={index} style={{margin: '10px 0px 10px 0px', textAlign: 'center'}}>
                          {
                            i.resType == 1 ? <img
                              src={i.content}
                              alt={i.content}
                              style={{width: '200px', border: '1px solid gray'}} />
                              :
                              <video
                                src={i.content}
                                controls
                                style={{width: '200px'}} />
                          }
                        </Col>
                      )
                    }
                  )
              }
            </Row>
          }
        </FormItem>

      </Form>
    );
  }
};

Demo.defaultProps = {
  oldNode: {resList: []}
}

export default Form.create()(Demo)