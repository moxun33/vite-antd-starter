/**
 * Created by xun on  2021/9/7 9:44.
 * description: axios-uils
 */
/* *

仅生成对应的拦截配置
*/

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { STORAGE_KEY_MAPPING } from '../consts/user';
import { openNotification } from './antd';
import { createBlobUrlByBlobRes } from './file';

export interface IReqConf extends AxiosRequestConfig {
  title?: string;
  toggleLoading?: boolean;
  errTitle?: string;
}
const DEFAULT_FUNC = () => 0;

const DEF_OPTS = {
  openNotification: DEFAULT_FUNC,
  showErrorMsg: DEFAULT_FUNC,
  url: '',
  redirectToLogin: DEFAULT_FUNC
};
const LSKO = STORAGE_KEY_MAPPING;

/**
 * @ignore
 *@desc 检测存在NEW_TOKEN，清零 ac 本地存储，否则 ac+1
 *@author moxx
 *@date 2018/10/30 19:13:40
 *@param headers  Object 响应头
 * @param storageKeyObj
 * @param data Object 是否为错误的响应
 * @param options {object}
 *@return
 */
export const checkNewToken = (
  headers: Record<any, any>,
  storageKeyObj = LSKO,
  data: Record<any, any> = {},
  options: Record<any, any> = DEF_OPTS
) => {
  const cacheAC: string = window.localStorage.getItem(storageKeyObj.API_COUNT) || '0';
  let localApiCount = parseInt(cacheAC) > 0 ? parseInt(cacheAC) : 0;
  const unauthenticated = data && parseInt(String(data.code)) === 401,
    _headers: Record<any, any> = headers || {};
  const newToken = _headers['new-token'] || _headers['New-Token'];
  if (headers && newToken) {
    //刷新 token
    window.localStorage.setItem(storageKeyObj.AUTH_TOKEN, newToken);
    localApiCount = 0;
  } else {
    if (unauthenticated) {
      localApiCount = 0;
      //没有刷新 token，且未授权，直接重定向登录页面，而且清空 ac
      if (data.message !== 'unauthorized') {
        //只有权限的情况下重登

        options.redirectToLogin();
      }
    } else {
      // 认证服务相关的请求无需设置 ac
      if (options.url && !String(options.url).startsWith('/auth')) {
        localApiCount += 1;
      }
    }
  }
  window.localStorage.setItem(storageKeyObj.API_COUNT, String(localApiCount));
};

/**
 *@desc 创建通用的 axios 请求拦截器config
 *@author moxx
 *@date 2018/12/07 13:33:10
 *@param
 *@return
 */
const setFormData = (value: string) => {
  //允许 '0','false'
  const val = String(value);
  if (val === '[object File]' || val === '[object Blob]') {
    return value;
  }
  if (val !== 'null' && val.trim() !== '' && val !== 'undefined') {
    return val;
  }
  return '';
};
//提纯换行符、回车符
const cleanFormValue = (val: any) => {
  //排除File、Blob
  if (!val || val instanceof File || val instanceof Blob) {
    return val;
  }
  return String(val).replace(/\r\n/g, '\n');
};
const initRequestConfig = (config: IReqConf = {}, storageKeyObj = LSKO) => {
  const headers: Record<any, any> = config?.headers || {};
  if (config.method === 'post' && config.data) {
    //非 json 串时

    if (!headers['Content-Type'] || headers['Content-Type']?.indexOf('application/json') === -1) {
      //统一用 formData 提交
      headers['Content-Type'] = 'multipart/form-data';
      const formData = new FormData();
      const object = config.data;
      Object.keys(object).forEach((key) => {
        const value = object[key];
        if (value && Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(key, item);
          });
        } else {
          const filteredVal = cleanFormValue(value);
          const includeInvalidValue = headers['Include-Invalid-Value'];
          if (includeInvalidValue) {
            formData.append(key, setFormData(value));
          } else if (value) {
            formData.append(key, filteredVal);
          }
        }
      });

      config.data = formData;
    }
  }
  if (config.method === 'get') {
    //大文件
    if (config.responseType === 'blob') {
      headers['Accept'] = '*/*';
      headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    } else {
      //获取列表时
      if (String(config.url).endsWith('List')) {
        //默认不分页
        if (!config.params.page) {
          config.params['page'] = -1;
        }
        if (!config.params.pageLength) {
          config.params['pageLength'] = 10;
        }
      }
    }
  }

  const authToken = window.localStorage.getItem(storageKeyObj.AUTH_TOKEN);
  const ac = String(window.localStorage.getItem(storageKeyObj.API_COUNT) || 0);
  if (authToken) {
    headers['Authorization'] = authToken;
    headers['ac'] = parseInt(ac) > 0 ? ac : 0;
  }

  return config;
};
/**
 *@desc 请求拦截错误
 *@author moxx
 *@date 2018/12/07 15:44:54
 *@param
 *@return
 */
const initRequestError = (err: string) => Promise.reject(err);

/**
 *@desc 正常响应体
 *@author moxx
 *@date 2018/12/07 15:44:37
 *@param
 *@return
 */
const initResponseConfig = (
  response: AxiosResponse,
  storageKeyObj = LSKO,
  options: Record<any, any> = DEF_OPTS
) => {
  checkNewToken(response.headers, storageKeyObj, response.data, {
    ...options,
    url: response?.config?.url || ''
  });
  const statusCode = parseInt(response?.data?.code);
  if (statusCode === 200) {
    return response.data;
  } else {
    const reqConf: IReqConf = response.config;
    // 当是文件流,把整个响应返回
    if (response.config?.responseType === 'blob') {
      const fileRes = {
        code: 200,
        data: response.data,
        url: createBlobUrlByBlobRes(response.data),
        contentType: response.headers['content-type'],
        errTitle: reqConf.errTitle,
        type: response.headers['content-type'],
        filename: response.headers['content-disposition']
          ? decodeURIComponent(
              response.headers['content-disposition'].replace('attachment;filename=', '')
            )
          : '',
        message: ''
      };
      if (fileRes.contentType && fileRes.contentType.includes('application/json')) {
        // 获取文件 出错
        fileRes.code = 500;
        const reader = new FileReader();
        reader.readAsText(response.data);
        reader.onload = function (event) {
          const json = JSON.parse(reader.result as string); //内容就在这里
          fileRes.message = json.message;

          openNotification('error', fileRes.errTitle || '获取文件失败', fileRes.message);
        };
      }
      return fileRes;
    } else {
      if (statusCode === 413) {
        openNotification('error', '文件太大了', '请选择更小一点的文件', 10);
      }
      /*  if (statusCode === 500) {
        openNotification('error', `${reqConf.errTitle}失败`, response.data.message || '');
      }*/

      /*    if (statusCode === 500 && (response.data.message === "GENERAL"||response.data.message === "SHORTCIRCUIT")) {
				options.showErrorMsg(
					"Ohh,系统离线了，请稍后重试. error:" + response.data.message
				);
			}*/
      return response.data;
    }
  }
};
/**
 *@desc 响应拦截错误
 *@author moxx
 *@date 2018/12/07 15:44:25
 *@param
 *@return
 */
const initResponseError = (
  error: AxiosError,
  storageKeyObj = LSKO,
  options: Record<any, any> = DEF_OPTS
) => {
  const errRes = (error.response || {}) as AxiosError,
    url = errRes.config?.url || '';
  checkNewToken(error.response ? error.response.headers : {}, storageKeyObj, errRes, {
    ...options,
    url
  });

  console.error('请求出错啦', errRes);
  const status = errRes?.status ? parseInt(errRes.status) : 0;

  switch (status) {
    case 0:
      openNotification('error', '系统异常！状态码：0', url);
      break;
    case 400:
      openNotification('error', '请求错误(400)', url);

      break;
    case 401:
      openNotification('error', '请重新登录！');
      options.redirectToLogin();
      break;
    case 403:
      openNotification('error', '服务器连接失败(403)', url);
      break;
    case 404:
      openNotification('error', '资源不存在(404)', url);
      break;
    case 500:
      openNotification('error', '服务器错误(500)', url);
      break;
    case 501:
      openNotification('error', '服务未实现(501)', url);
      break;
    case 502:
      openNotification('error', '网络错误(502)', url);
      break;
    case 503:
      openNotification('error', '我们正在对系统进行升级维护，期间由此造成的不便敬请谅解。');
      break;
    case 504:
      openNotification('error', '响应超时，请稍后再试！', url);
      break;
    default:
      openNotification('error', `连接出错(${errRes?.status || 'failed'})!`, url);
  }

  return Promise.reject(error);
};

/**
 * axios 的上传进度计算
 * @param {object} progressEvent
 * */
const calcAxiosProgress = (progressEvent: any) =>
  ((progressEvent.loaded / progressEvent.total) * 100) | 0;

/**
 *@desc axios 工具集,成员方法：calcAxiosProgress,initRequestConfig,initRequestError,initResponseConfig,initResponseError
 *@author moxx
 *@date 2018/12/07 15:45:12
 *@param
 *@return
 */
const MXAxiosUtil = {
  calcAxiosProgress,
  initRequestConfig,
  initRequestError,
  initResponseConfig,
  initResponseError
};
export default MXAxiosUtil;
