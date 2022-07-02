import axios from 'axios';
import { STORAGE_KEY_MAPPING } from '../consts/user';

import { openNotification, showErrorMsg } from './antd';

import MXAxiosUtil from './axios-uils';

axios.defaults.timeout = 30000;
axios.defaults.baseURL = '/api'; //增加代理路径
axios.defaults.withCredentials = true;

/**
 * token过期或者未登录
 * */
const redirectToLogin = () => {
  window.localStorage.clear();
  showErrorMsg('登录已失效！请重新登录', 2);
  //	eventBus.emit(EVENT_GO_LOGIN_PAGE, 'token失效');
  window.location.href = '/auth';
};
//弹窗错误请求信息
const openErrorNotification = (type: string, msg: string) => {
  let data: IObject = {};
  try {
    data = JSON.parse(msg.replace('请求出错了: ', ''));
  } catch (e) {
    data = {};
  }
  const config = data.config || {},
    params = config.params || {};
  let content = config.url ? `地址：${config.url || ''}；请求参数：${JSON.stringify(params)}` : '';
  if (data.code && data.message) {
    content = data.message;
  }
  console.log(data, msg);
  openNotification('error', '请求失败', content);
};
const options = {
  redirectToLogin: redirectToLogin,
  openNotification: openErrorNotification,
  showErrorMsg: (msg: string) => showErrorMsg(msg)
};

/**
 * 如果登录了，就把token写入header
 * */
//请求拦截

axios.interceptors.request.use(
  (config) => {
    return MXAxiosUtil.initRequestConfig(config, STORAGE_KEY_MAPPING);
  },
  (error) => {
    return MXAxiosUtil.initRequestError(error);
  }
);

//响应拦截
axios.interceptors.response.use(
  (response) => {
    // appStore.hideLoading();
    //console.log(response, 1900);
    if (parseInt(response?.data?.code) === 500 && response?.data?.message === 'GENERAL') {
      showErrorMsg('ohh,系统繁忙，请稍后重试！');
    }
    return MXAxiosUtil.initResponseConfig(response, STORAGE_KEY_MAPPING, options);
  },
  (error) => {
    //appStore.hideLoading();
    return MXAxiosUtil.initResponseError(error, STORAGE_KEY_MAPPING, options);
  }
);

export default axios;
