/**
 * Created by xun on  2021/12/2 16:57.
 * description: storage
 */
import { isJsonStrValid, isJSONValid } from './function';
import { STORAGE_KEY_MAPPING } from '../consts/user';

export const saveItem = (key: string, value: any) => {
  window.localStorage.setItem(key, value instanceof Object ? JSON.stringify(value) : value);
};

export const getItem = (key: string) => {
  const v = window.localStorage.getItem(key) || '';
  return isJsonStrValid(v) ? JSON.parse(v) : v;
};

//	保存用户信息
export const saveUserInfo = (info: Partial<User> = {}) => {
  saveItem(STORAGE_KEY_MAPPING.AUTH_TOKEN, info.token);
  saveItem(STORAGE_KEY_MAPPING.ROLES, JSON.stringify(info.roles || []));
  saveItem(STORAGE_KEY_MAPPING.USER_NAME, info.name);
  saveItem(STORAGE_KEY_MAPPING.AVATAR, info.avatar);
  saveItem(STORAGE_KEY_MAPPING.USER_ID, info.userId);
  saveItem(STORAGE_KEY_MAPPING.LOGIN_ACCOUNT, info.loginAccount);
  saveItem(STORAGE_KEY_MAPPING.PERMISSION_LIST, JSON.stringify(info.permissions || []));
};

//获取本地的用户信息
export const getLocalUserInfo = (): User => ({
  token: getItem(STORAGE_KEY_MAPPING.AUTH_TOKEN),
  userId: getItem(STORAGE_KEY_MAPPING.USER_ID),
  avatar: getItem(STORAGE_KEY_MAPPING.AVATAR),
  roles: getItem(STORAGE_KEY_MAPPING.ROLES),
  name: getItem(STORAGE_KEY_MAPPING.USER_NAME),
  permissions: getUserPermissions(),
  loginAccount: getItem(STORAGE_KEY_MAPPING.LOGIN_ACCOUNT)
});
//获取当前用户的权限列表
export const getUserPermissions = (viewOnly = false) => {
  const v = getItem(STORAGE_KEY_MAPPING.PERMISSION_LIST);
  const list = Array.isArray(v) ? v : isJSONValid(v) ? JSON.parse(v) : [];
  return viewOnly
    ? list.filter((item: string) => item.endsWith('_V') || item.endsWith('_R'))
    : list;
};

//检查用户是否已登录
export const checkUserLogined = (info: IObject) => {
  info = info || getLocalUserInfo();
  return info && info.token && info.name && info.loginAccount;
};
