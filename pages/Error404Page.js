import React from 'react'
import { render } from 'react-dom'

export default class Error404Page extends React.Component {
  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <p style={{fontSize: 26}}>页面被火星网友带走了</p>
      </div>
    )
  }
}