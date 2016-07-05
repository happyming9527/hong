"use strict";
import React from 'react'
import { message, Spin } from 'antd';
import 'antd/dist/antd.css'
import { browserHistory } from 'react-router'

const info = {
  info:  (str, time)=>message.info(str, time||3),
  error: (str, time)=>message.error(str, time||3),
  success: (str, time)=>message.success(str, time||3),
  warning: (str, time)=>message.warn(str, time||3),
  loading: (str, time)=>message.loading(str, time||3)
}

const history = browserHistory
const historyReload = (path)=>{
  history.push('/');
  history.push(path);
}

const historyReplace = (path)=>{
  browserHistory.replace(path)
}

const loading = ()=>{
  return <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Spin size="large" />
  </div>
}


export default {
  info,
  history,
  historyReload,
  loading
}