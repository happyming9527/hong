"use strict";
import React from 'react'
import { message, Spin, Row, Breadcrumb } from 'antd';
import 'antd/dist/antd.css'
import { browserHistory, Link } from 'react-router'
import TimerMixin from 'react-timer-mixin'
import reactMixin from 'react-mixin'
import Locales from './Locales.js'

const addTimerMixin = (clazz)=>{
  reactMixin.onClass(clazz, TimerMixin);
}

const info = {
  info: (str, time)=>message.info(str, time || 3),
  error: (str, time)=>message.error(str, time || 3),
  success: (str, time)=>message.success(str, time || 3),
  warning: (str, time)=>message.warn(str, time || 3),
  loading: (str, time)=>message.loading(str, time || 3)
}

const history = browserHistory
const historyReload = (path)=> {
  history.replace('/login');
  history.replace(path);
}

const historyGoBack = ()=> {
  history.goBack()
}

const historyReplace = (path)=> {
  browserHistory.replace(path)
}

const errorHandle = (result)=>{
  if (result.code == -1) {
    throw new Error(result.text||'服务器出错, 请联系开发者.')
  } else if (result.code == -10) {
    window.localStorage.removeItem('userInfo')
    history.push('/login')
    throw new Error(result.text||'请先登录.')
  }
}

const httpPost = (url, params = {})=> {
  return fetch(url, {
      method: 'post',
      credentials: 'include',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(params)
    }
  )
    .then(e=>e.json())
    .then(result=> {
      errorHandle(result)
      return result
    })
}

const httpGet = (url, params = {})=> {
  let str = ''
  if (Object.keys(params).length !== 0) {
    str += '?'
    str += Object.keys(params).map(key=> {
      return key + '=' + params[key];
    }).join('&');
  }

  return fetch(url+str, {
    method: 'get',
    credentials: 'include',
    headers: {"Content-Type": "application/json"}
  })
    .then(e=>e.json())
    .then(result=> {
      errorHandle(result)
      return result
    })
}

const loading = ()=> {
  return <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Spin size="large"/>
  </div>
}

const BreadCrumb = (props)=>{
  return (
    <Row>
      <Breadcrumb separator=">">
        <Breadcrumb.Item><Link to="/backend">首页</Link></Breadcrumb.Item>
        {
          props.list.map(
            i=>{
              return (
                <Breadcrumb.Item key={i.name}>
                  { i.url ? <Link to={i.url}>{i.name}</Link> : i.name }
                </Breadcrumb.Item>
              )
            }
          )
        }
      </Breadcrumb>
    </Row>
  )
}

const Container = (props)=>{
  return !props.loaded ? loading() :
    <div style={{width: '100%', padding: '20px 30px'}}>
      {
        !props.breadcrumb ? null:
          <BreadCrumb list={ props.breadcrumb }/>
      }
      {
        props.children
      }
    </div>
}

Container.defaultProps = {
  loaded: true
}

const PaddingRow = (props)=>{
  return (
    <Row style={{marginTop: 20, marginBottom: 20}}>
      {props.children}
    </Row>
  )
}

const compact = (array)=>{
  return array.filter((i, index)=>{
    return (array.indexOf(i)==index) && i
  })
}

const storage = window.sessionStorage

export default {
  addTimerMixin,
  info,
  history,
  historyReload,
  historyGoBack,
  loading,
  httpPost,
  httpGet,
  storage,
  BreadCrumb,
  Container,
  PaddingRow,
  compact,
  Locales
}