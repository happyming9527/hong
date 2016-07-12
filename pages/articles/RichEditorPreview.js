import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {  Row, Col  } from 'antd'

export default class RichEditorPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.htmlTemplate =
      `
<!doctype html>
<html>
<meta charset=utf-8/>
<title>彩虹</title>
<head>
<style type="text/css">
  html {
    padding: 0px;
    margin: 0px;
  }

  body {
    text-align: left;
    line-height: 1.5em;
    padding: 0px;
    margin: 0px;
    height: 736px;
    width: 414px;
  }

  img {
    width: 100%;
    text-align: center;
  }

  blockquote {
    border-left: 5px solid #eee;
    color: #666;
    font-family: 'Hoefler Text', 'Georgia', serif;
    font-style: italic;
    margin: 16px 0;
    padding: 10px 20px;
  }

  h1,h2,h3,h4,h5,h6,p {word-wrap:break-word;}

</style>
</head>
<body>
    #replacement#
</body>
`
  }

  setContent(html) {
    var doc = window.rich_editor_preview.document.open();
    let result = this.htmlTemplate.replace('#replacement#', html)
    doc.write(result);
    doc.close();
  }

  componentDidMount() {
    this.setContent(this.props.html)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (this.props.html !== nextProps.html) {
      this.setContent(nextProps.html)
    }
  }

//<div dangerouslySetInnerHTML={{__html: this.props.html}}></div>
//  style={{width: '414px', height: '736px'}}
  render() {
    return <iframe style={{width: '414px', height: '736px'}} name="rich_editor_preview"></iframe>
  }
}