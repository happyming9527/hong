"use strict";
import React from 'react'
import { message, Spin } from 'antd';
import 'antd/dist/antd.css'
import { browserHistory } from 'react-router'

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


export default {
  info,
  history,
  historyReload,
  loading,
  httpPost,
  httpGet
}