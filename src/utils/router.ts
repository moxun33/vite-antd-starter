/**
 * Created By xun  on 2018-12-26 21:56.
 * Description: router
 */

import { splitValidArray } from '@/utils/function';

/**
 * 根据 pathname 设置当前菜单高亮的 key
 * */
export const getMenuSelectedKey = (pathname: string, defaultKey: string, position = 0) => {
  if (!pathname) {
    return defaultKey;
  }
  const splitArr = splitValidArray(pathname);
  return splitArr.length > position ? splitArr[position] : defaultKey;
};

//跟 pathname 提取面包屑的数据
export const setBreadcrumbData = (location: Record<any, any>, title: string, depth = 1, editDepth = 2) => {
  const { pathname } = location;
  if (!pathname) {
    return [];
  }
  const arr = splitValidArray(pathname);

  if (arr.length > depth) {
    return [
      { key: 'edit', text: `${arr.length > editDepth ? '编辑' : '添加'}${title}`, path: pathname }
    ];
  }

  return [];
};
