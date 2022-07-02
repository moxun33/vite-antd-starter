/**
 * Created by xun on  2021/12/2 16:58.
 * description: function
 */
//判断string是否为json
export const isJsonStrValid = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 *
 *
 *@desc 根据 small 的值， 配置antd formItem 的长度
 *@author moxx
 *@date 2018/10/16 21:03:49
 *@param sm {number} 表单输入框的布局
 *@return {object}
 */
interface GridSpan {
  span: number;
}

interface LabelCol {
  xs: GridSpan;
  sm: GridSpan;
}

interface IFormLayout {
  labelCol: LabelCol;
  wrapperCol: LabelCol;
}

/**
 *@desc 设置 antd 表单的布局
 *@author moxx
 *@date 2018/12/07 15:41:37
 *@param {number} sm 小尺寸下的列
 *@return {IFormLayout}
 */
export const setFormItemLayout = (sm = 6): IFormLayout => {
  return {
    labelCol: {
      xs: { span: 24 },
      sm: { span: sm }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 - sm }
    }
  };
};
/**
 * 判断是否为有效的JSON数据
 * */
export const isJSONValid = isJsonStrValid;

export const splitValidArray = (str: string, sep = '/') => str.split(sep).filter(Boolean);

//提取状态枚举的对应对象
export const extractOptionsObj = (
  v: string,
  options: IObject[] = [],
  valKey = 'value'
): IObject => {
  const filtered: IObject[] = options.filter((item) => item[valKey] + '' === v + '');
  return filtered.length ? filtered[0] : {};
};

export const updateDocumentTitle = (title?: string) =>
  (document.title = title ? `${title} - DevOps` : 'DevOps');

export function camelToLine(str: string) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

//根据字符串设置颜色
export function getRandomColor(name: string) {
  if (!name) return '';
  // get first alphabet in upper case
  const firstAlphabet = name.charAt(0).toLowerCase();

  // get the ASCII code of the character
  const asciiCode = firstAlphabet.charCodeAt(0);

  // number that contains 3 times ASCII value of character -- unique for every alphabet
  const colorNum = asciiCode.toString() + asciiCode.toString() + asciiCode.toString();

  const num = Math.round(0xffffff * parseInt(colorNum));
  const r = (num >> 16) & 255;
  const g = (num >> 5) & 255;
  const b = num & 255;
  return `rgba(${r},${g},${b},1)`;
  /*return {
    color: 'rgb(' + r + ', ' + g + ', ' + b + ', 0.3)',
    character: firstAlphabet.toUpperCase()
  };*/
}
