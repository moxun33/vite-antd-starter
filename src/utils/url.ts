/**
 * Created by xun on  2022/5/18 14:08.
 * description: url
 */

/**
 * 解析 url 的 search 参数
 * @param qs
 * @return object
 * {key:value}
 * */
export const parseUrlSearch = (qs = ''): IObject => {
  if (qs && qs.indexOf('?') > -1 && qs.startsWith('?')) {
    const newQS = qs.replace('?', '');
    const tmpArr = newQS.split('&');
    const finalObj = {};
    tmpArr.forEach((item) => {
      const itemSplit = item.split('=');
      if (itemSplit.length === 2) {
        // @ts-ignore
        finalObj[itemSplit[0]] = decodeURIComponent(itemSplit[1]);
      }
    });
    return finalObj;
  }
  return {};
};

/**
 * 把对象拼接成 url search 参数
 * @param object
 *
 * @return string
 * */
export const initObjToUrlSearch = (obj: IObject) => {
  let urlQs = '';
  const keys = Object.keys(obj);
  if (obj instanceof Object && keys.length > 0) {
    keys.forEach((s, i) => {
      // @ts-ignore
      const v = obj[s];
      if (s && v) {
        if (i === 0) {
          urlQs += `?${s}=${v}`;
        } else {
          urlQs += `&${s}=${v}`;
        }
      }
    });
  }

  return urlQs;
};
