// src/plugins/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:9529/api/', // 设置你的全局接口地址
  timeout: 5000, // 请求超时时间
});

export default instance;
