/**
 * Created by xun on  2021/12/3 15:14.
 * description: datetime
 */

import { DATE_FORMAT, DATETIME_FORMAT } from '@/consts/const';
import dayjs from 'moment';
import 'moment/dist/locale/zh-cn';

dayjs.locale('zh-cn');

/**
 * momentjs 格式成 2017-09-12
 * */

export const formatMomentToString = (mDate: any, format = DATE_FORMAT) => {
  return mDate ? dayjs(mDate).format(format) : null;
};
/**
 * 把2017-12-12 字符串的格式实例化成 moment
 * */
export const convertStringToMoment = (dateStr: string | number) => {
  if (!dateStr || dateStr < 1) {
    return undefined;
  }
  const m = dayjs(dateStr);
  if (m.isValid()) {
    return m;
  } else {
    return undefined;
  }
};
/**
 * 格式化时间戳 成字符串
 * 兼容秒、毫秒
 *
 * */
export const formatTimeStampToString = (date: number, format = DATETIME_FORMAT): string => {
  if (!date || date < 1) {
    return '';
  }

  if (String(date).indexOf('-') > -1) {
    return String(date);
  }
  const mDate = Number.parseInt(date.toString());
  const stampLength = String(mDate).length;
  let nDate = mDate;
  if (stampLength === 10) {
    nDate = nDate * 1000;
  }
  return dayjs(nDate).format(format);
};
