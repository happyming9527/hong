"use strict"
import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';
import { Button, Form, Input, Table, Popconfirm, Modal, Row, Col, Tabs, Upload, Icon} from 'antd';
const TabPane = Tabs.TabPane;
import ST from '../../Setting.js'

export default class Attachments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      dataSource: [],
      currentNode: null,
      tab: '1'
    }
  }

  componentWillMount() {
    this.fetchData()
  }

  componentWillReceiveProps(nextProps) {
    let that = this
    if (this.props.attachmentKind !== nextProps.attachmentKind) {
      this.setState({
        attachmentKind: nextProps.attachmentKind,
        tab: '1'
      },()=>{
        that.fetchData()
      })
    }
  }

  fetchData() {
    if (!this.props.attachmentKind) return
    ST.httpPost('/api/attachments/list', {kind: this.props.attachmentKind})
    .then(result=>{
      this.setState({
        dataSource: result.data,
        currentNode: null
      })
    })
  }

  toggle() {
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible })
  }

  changeCurrentNode(node) {
    this.setState({
      currentNode: node
    })
  }

  submit() {
    if (!this.state.currentNode) {
      ST.info.error('您还未选择资源.')
      return false
    }
    this.props.submitCallback(this.state.currentNode.file.path)
    this.setModalVisible(false)
  }

  render() {
    let that = this
    let attachmentType = `${this.props.attachmentKind}/*`
    let uploadUrl = `/api/attachments/upload_${this.props.attachmentKind}`
    const props = {
      name: 'file',
      action: uploadUrl,
      accept: attachmentType,
      headers: {
        //authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          let obj = info.file.response.data
          let newDataSource = that.state.dataSource.slice()
          newDataSource.unshift(obj)
          that.setState({
            dataSource: newDataSource
          }, ()=>ST.info.success(`${info.file.name} 上传成功。`))
        } else if (info.file.status === 'error') {
          ST.info.error(`${info.file.name} 上传失败。`);
        }
      },
    };

    return (
      <div>
        <Modal
          width={700}
          title="素材选择"
          wrapClassName="vertical-center-modal"
          visible={this.state.modalVisible}
          onOk={this.submit.bind(this)}
          onCancel={() => this.setModalVisible(false)}
        >
          {
            !this.props.attachmentKind ? null:
              <div>
                <Tabs activeKey={this.state.tab} onChange={(key)=>{ this.setState({tab: key}) }}>
                  <TabPane tab="已有资源" key="1">
                    <Row gup={5}>
                      {
                        !this.state.dataSource.length ? <div>暂无相关资源</div>:
                          this.state.dataSource.map(
                            i=>{
                              return (
                                <Col span={6} key={i.id} style={{margin: '10px 0px 10px 0px', textAlign: 'center'}}>
                                  <img
                                    onClick={this.changeCurrentNode.bind(this, i)}
                                    src={i.file.logo}
                                    alt={i.name}
                                    style={{width: '100px', height: '100px', border: `2px ${ this.state.currentNode==i ? 'solid':'' } red`}} />
                                </Col>
                              )
                            }
                          )
                      }
                    </Row>
                  </TabPane>
                  <TabPane tab="上传新资源" key="2">
                    <div>
                      <Upload {...props}>
                        <Button type="ghost">
                          <Icon type="upload" /> 点击上传
                        </Button>
                      </Upload>
                    </div>
                  </TabPane>
                </Tabs>

              </div>
          }
        </Modal>
      </div>
    );
  }
}