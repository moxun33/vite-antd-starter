/**
 * Created By xun  on 2018-12-27 09:06.
 * Description: antd 封装一些 antd 的方法
 */

import { Select, message, Modal, notification, Tag } from 'antd';
import React from 'react';

//分页的每页显示数量的候选
export const mxPageSizeOptions = ['10', '20', '50', '100', '300', '500'];

//通用分页设置
export const genPaginationSetup = () => ({
  className: 'mx-pagination',
  size: 'small',
  showSizeChanger: true,
  pageSizeOptions: mxPageSizeOptions,
  defaultPageSize: 50,
  pageSize: 50,
  current: 1,
  //hideOnSinglePage: true,
  showQuickJumper: true,
  showTotal: (total: number, range: number[]) => (
    <span>
      当前
      <span className={'mx-pagination-num '}>
        {range[0]}-{range[1]}
      </span>
      条， 总共
      <span className={'mx-pagination-num '}>{total}</span>条
    </span>
  )
});

/**
 * 根据数组生成下拉选择候选
 * dataSource 是对象数组[{},{}]
 * keyName 是 options 中 value 的变量名, value的值 允许string和number
 * labelName 是options 中 文本的变量名
 * */

export const wrapOptions = (data: IObject[], keyName = 'value', labelName = 'text') => {
  if (Array.isArray(data) && data.length > 0) {
    return data.map((s, i) => {
      const v = s[keyName],
        label = `${s[labelName]}`;
      return (
        <Select.Option key={v} value={Number.isNaN(v) ? String(v) : v} title={label}>
          {label}
        </Select.Option>
      );
    });
  } else {
    return null;
  }
};
//初始化表单值，一般用于下拉、树选择等
export const initFormStrValue = (v: any, deVal = undefined) => (v ? v.toString() : deVal);
/**
 * 根据数组生成单选列表
 * dataSource 是对象数组[{},{}]
 * keyName 是 options 中 value 的变量名
 * labelName 是options 中 文本的变量名
 * */

export const genRadiosData = (data: IObject[], keyName = 'value', labelName = 'text') => {
  if (data !== null && data.length > 0) {
    return data.map((s, i) => {
      const value = `${s[keyName]}`,
        label = `${s[labelName]}`;
      return { value, label };
    });
  } else {
    return [];
  }
};

/**
 * 根据Pagination属性转换请求分页参数
 * */
export const getReqParamByPagination = (pagination: IObject, defaultSize = 50) => {
  if (!pagination) {
    return {};
  }
  return { page: pagination.current || 1, pageLength: pagination.pageSize || defaultSize };
};
/**
 * 全局成功的提示
 * @no-tests
 * */

export const showSuccessMsg = (msg: string, duration = 3, onClose = () => 0) => {
  const conf = {
    maxCount: 3,
    content: msg,
    duration,
    onClose,
    key: msg
  };
  message.success(conf);
};
/**
 * @no-tests
 * 全局警告的提示
 * */
export const showWarningMsg = (msg: string) => {
  const conf = {
    maxCount: 3,
    content: msg,
    key: msg
  };
  message.warn(conf);
};

/**
 * 全局失败的提示
 * @no-tests
 * */
export const showErrorMsg = (msg: string, duration = 5, onClose = () => 0) => {
  const conf = {
    maxCount: 3,
    content: msg,
    duration,
    onClose,
    key: msg
  };
  message.error(conf);
};

/**
 * 弹出操作结果通知
 * @no-tests
 * */
export const openNotification = (type: 'error', title: string, content = '', duration = 5) => {
  notification[type]({
    key: title, //相同内容不会增加显示框
    message: title,
    description: content,
    duration: duration //自动计算持续时间
    /*	style: {
					width: 350,
					paddingRight: '112px',

				}
				*/
  });
};

/**
 * 全局confirm的modal
 * @no-tests
 * */
export const openConfirmModal = (
  title: string,
  content: string,
  onOk = () => 0,
  onCancel = () => 0,
  props = {}
) => {
  const confirm = Modal.confirm;
  confirm({
    title: title,
    content: content,
    okText: '确定',
    okType: 'primary',
    cancelText: '取消',
    onOk,
    onCancel,
    className: 'mx-confirm-modal',
    icon: null,
    ...props
  });
};
export const openErrorModal = (
  title: string,
  content: string,
  onOk?: (...args: any[]) => any,
  props: IObject = {}
) =>
  Modal.error({
    title,
    content,
    className: 'mx-confirm-modal',
    onOk,
    icon: null,
    okText: '确定',
    ...props
  });
export const openSuccessModal = (
  title: string,
  content: string,
  onOk?: (...args: any[]) => any,
  props: IObject = {}
) =>
  Modal.success({
    title,
    content,
    className: 'mx-confirm-modal',
    onOk,
    icon: null,
    okText: '确定',
    ...props
  });

export const initMXCardProps = () => ({
  bordered: false,
  className: 'mx-card'
});

export const inputNumberFormatter = (unit = '%') => {
  return {
    formatter: (value: number) => value + unit,
    parser: (value: string) => value.replace(unit, '')
  };
};

export const renderStatusTag = (config: IObject) => {
  if (!config) {
    return;
  }
  const { icon, text, color } = config;
  return (
    <Tag color={color} className="mx-tag">
      <img src={icon} />
      <span>{text}</span>
    </Tag>
  );
};
//根据给定值和选项提取中文文案
export const renderLabelByOptions = (
  value: any,
  options: IObject[] = [],
  valKey = 'value',
  textKey = 'label',
  pure = false
) => {
  if (!value || !Array.isArray(options)) {
    return '';
  }
  const filtered = options.filter((item: any) => item[valKey].toString() === value.toString()),
    obj: IObject = filtered.length ? filtered[0] : {};
  const text = obj[textKey] || obj['text'] || value;
  if (pure) return text;
  return <span style={obj.color ? { color: obj.color } : {}}>{text}</span>;
};
