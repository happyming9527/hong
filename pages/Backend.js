import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Row, Col  } from 'antd'
import Menus from './Menus.js'
import TopNavigator from './TopNavigator.js'

export default class Backend extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{flexDirection: 'column', justifyContent: 'flex-start', height: "100%", display: 'flex'}}>
        <Row style={{flex: 0}}>
          <TopNavigator/>
        </Row>
        <Row style={{flex: 1, alignItems: 'stretch', display: 'flex'}}>
          <Col span={6} style={{display: 'flex', overflowY: 'auto'}}>
            <Menus/>
          </Col>
          <Col span={18} style={{display: 'flex', overflowY: 'auto'}}>
            { this.props.children}
          </Col>
        </Row>
      </div>
    )
  }
}