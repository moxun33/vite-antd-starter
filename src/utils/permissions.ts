/**
 * Created by xun on  2020/9/28 15:19.
 * description: permissions
 */

import { getUserPermissions } from '@/utils/storage';

/**
 * @desc 判断当前用户是否有指定权限操作的授权
 * @param actionKey string | array 操作全名称或元素的 id或数组
 * @param viewOnly 只看_V后缀的权限key

 * */
export const hasPermissions = (actionKey: string | string[], viewOnly = false) => {
  const isArr = Array.isArray(actionKey);
  if (!actionKey || (isArr && actionKey.length < 1)) {
    return true;
  }
  const localPermissions = getUserPermissions(viewOnly);
  if (!(Array.isArray(localPermissions) && localPermissions.length > 0)) {
    return false;
  }

  if (isArr && actionKey.length > 0) {
    return (
      Array.from(new Set(localPermissions.filter((v) => new Set(actionKey).has(v)))).length > 0
    );
    //	return Array.from(new Set([...actionKey, ...localPermissions])).length > 0;
  } else {
    return localPermissions.indexOf(String(actionKey)) > -1;
  }
};
