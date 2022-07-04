import store from '@/stores/app-store';
import request from '../utils/request';
import { openNotification } from '../utils/antd';
import { IReqConf } from '../utils/axios-uils';

/**
 * 通用下载文件
 * */

export const fireGetFileRequest = async (
  api: string,
  values: IObject = {},
  responseType: any = 'blob',
  conf = {}
) => {
  //appStore.showLoading();
  const res = await fireGetRequest(api, values, {
    ...conf,
    headers: { isDownloadFile: true },
    responseType,
    toggleLoading: true
  });

  // appStore.hideLoading();
  return Promise.resolve(res);
};

/**
 * 通用上传文件(提交有文件的表单)
 * */
export const firePostUploadFile = async (
  api: string,
  values: IObject = {},
  config: IReqConf = {}
) => {
  config.timeout = 300000;
  config.onUploadProgress = (progressEvent: any) => {
    // const complete = calcAxiosProgress(progressEvent);
    // appStore.setDownloadProgress(complete);
  };
  // appStore.showLoading();
  const resp = await firePostRequest(api, values, config);
  //appStore.hideLoading();
  return Promise.resolve(resp);
};
/**
 * 通用 get 请求
 * toggleLoading 是否启动全局 loading
 * */
export const fireGetRequest = async (api: string, values: IObject = {}, config: IReqConf = {}) => {
  if (config && config.toggleLoading) {
    store.loading = true;
  }
  const resp: IObject = await request.get(api, { ...config, params: values });
  if (resp.code !== 200 && config && config.errTitle) {
    openNotification('error', config.errTitle || '请求失败', resp.message);
    if (config && config.toggleLoading) store.loading = false;

    return Promise.reject(resp);
  }
  if (config && config.toggleLoading) store.loading = false;
  // appStore.hideLoading();
  return Promise.resolve(resp);
};

/**
 * 通用 post 请求
 * toggleLoading 是否启动全局 loading
 * */
export const firePostRequest = async (api: string, values: IObject = {}, config: IReqConf = {}) => {
  if (config && config.toggleLoading) {
    store.loading = true;
  }
  const resp: IObject = await request.post(api, values, config);
  if (resp.code !== 200 && config && config.errTitle) {
    openNotification('error', config.errTitle || '操作失败', resp.message);
    if (config && config.toggleLoading) store.loading = false;

    return Promise.reject(resp);
  }
  if (config && config.toggleLoading) store.loading = false;
  //appStore.hideLoading();
  return Promise.resolve(resp);
};
/**
 *includeInvalidValue 组装 formData 时，空值时，也要append，value 为空串
 * */
export const postFormWithInvalidValue = (
  api: string,
  values: IObject = {},
  config: IReqConf = {}
) =>
  firePostRequest(api, values, {
    headers: { 'Include-Invalid-Value': true },
    ...config
  });
/*、*
 *并发
 * */
export const fireAxiosAll = (values = []) => {
  return request.all(values);
};
/**
 * 通用 post 请求-JSON 格式
 * */
export const firePostJsonReq = (api: string, values: IObject = {}, extraConfig: IReqConf = {}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    ...extraConfig
  };

  return firePostRequest(api, values, config);
};
