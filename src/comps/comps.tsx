//通用的无状态组件
import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

//自定义滚动条

export const MxScrollbar: React.FC<any> = (props) => (
  // @ts-ignore
  <PerfectScrollbar>{props.children}</PerfectScrollbar>
);
