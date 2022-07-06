import { splitValidArray } from '@/utils/function';
import { Breadcrumb, MenuProps } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Created by xun on  2022/5/23 14:38.
 * description: comps
 */
function getBreadInfo(key: string, menuOpts: MenuProps['items'] = []) {
  const filtered = menuOpts.filter((item: any) => item.key === key);
  return filtered.length ? filtered[0] : {};
}
export function getBreadcrumbItem(key: string, menuOpts: MenuProps['items'] = []) {
  const info: Record<any, any> = getBreadInfo(key, menuOpts) as Record<any, any>;
  return (
    info &&
    info.label && (
      <Breadcrumb.Item>
        <Link to={info.label?.props?.to}>{info.label?.props.children}</Link>
      </Breadcrumb.Item>
    )
  );
}
//统一的面包屑
export const HomeBreadcrumb: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation(),
    pathKeys = splitValidArray(location.pathname);

  return (
    <Breadcrumb style={{ marginBottom: 10 }}>
      <Breadcrumb.Item>
        <Link to={'/'}>首页</Link>
      </Breadcrumb.Item>
      {getBreadcrumbItem(pathKeys[0], [])}
      {children}
    </Breadcrumb>
  );
};
