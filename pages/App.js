import React from 'react'
import { render } from 'react-dom'

export default class App extends React.Component {
  render() {
    return this.props.children
  }
}