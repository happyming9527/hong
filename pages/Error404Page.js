import React from 'react'
import { render } from 'react-dom'

export default class Error404Page extends React.Component {
  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%', marginTop: '20%'}}>
        <p style={{fontSize: 26}}>页面被火星网友带走了</p>
      </div>
    )
  }
}