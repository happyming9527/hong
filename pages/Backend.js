import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Row, Col  } from 'antd'
import Menus from './Menus.js'

export default class Backend extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{flexDirection: 'column', justifyContent: 'flex-start', height: "100%", display: 'flex'}}>
        <Row style={{flex: 0}}>
          <Col span={24} style={{height: 100, backgroundColor: '#262626'}}>
            <p>顶部导航栏</p>
          </Col>
        </Row>
        <Row style={{flex: 1, alignItems: 'stretch', display: 'flex'}}>
          <Col span={6}>
            <Menus/>
          </Col>
          <Col span={18}>
            <div>
              { this.props.children}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}