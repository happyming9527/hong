import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Row, Col  } from 'antd'
import LeftMenus from './_LeftMenus.js'
import TopNavigator from './_TopNavigator.js'
require("./global.scss");

export default class Backend extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.pathname != newProps.location.pathname ||this.props.location.search != newProps.location.search) {
      this.refs.scrollDiv.scrollTop = 0
    }
  }

  render() {
    return (
      <div style={{flexDirection: 'column', justifyContent: 'flex-start', height: "100%", display: 'flex'}}>
        <Row style={{flex: 0}}>
          <TopNavigator/>
        </Row>
        <Row style={{flex: 1, alignItems: 'stretch', display: 'flex'}}>
          <Col span={6} style={{display: 'flex', overflowY: 'auto'}}>
            <LeftMenus style={{flex: 1}} />
          </Col>
          <Col span={18} style={{padding: 0, display:'flex'}}>
            <div ref='scrollDiv' style={{flex: 1, display: 'flex', overflowY: 'auto', width: '100%'}} >
              { this.props.children}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}