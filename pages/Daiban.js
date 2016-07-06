import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Row, Col , Card } from 'antd'

export default class DaiBan extends React.Component {
  render() {
    return (
      <div style={{width: '100%', padding: '20px 30px'}}>
        <Row>
          <Card>
            您的待办事项
          </Card>
        </Row>
      </div>
    )
  }
}