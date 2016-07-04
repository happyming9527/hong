"use strict";
import { message } from 'antd';
import 'antd/dist/antd.css'
import { browserHistory } from 'react-router'

const info = {
  info:  (str, time)=>message.info(str, time||5),
  error: (str, time)=>message.error(str, time||5),
  success: (str, time)=>message.success(str, time||5),
  warning: (str, time)=>message.warn(str, time||5),
  loading: (str, time)=>message.loading(str, time||5)
}

const historyPush = (path)=>{
  browserHistory.push(path)
}


export default {
  info,
  historyPush
}