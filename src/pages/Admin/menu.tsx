/**
 * Created by xun on  2021/5/7 14:42.
 * description: menu 前台导航菜单
 */
import * as routes from '@/consts/routes/admin';
import { Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import { getMenuSelectedKey } from '@/utils/router';
import { extractMenuPathKey } from '@/utils/menu';
import {
  CloudServerOutlined,
  ControlOutlined,
  DashboardOutlined,
  RocketOutlined,
  SafetyOutlined,
  SettingOutlined,
  SlidersOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const getMenuKey = extractMenuPathKey;

//前台顶部导航菜单
export const AdminLeftMenu: React.FC<{ location: Location }> = ({ location = window.location }) => {
  const menus: MenuProps['items'] = [
    {
      icon: <DashboardOutlined />,
      label: <Link to={routes.P_A_DASHBOARD}>首页</Link>,
      key: getMenuKey(routes.P_A_DASHBOARD, 1)
    }
  ];
  const defaultSelectedKey = getMenuSelectedKey(
      location.pathname,
      getMenuKey(routes.P_A_DASHBOARD, 1),
      2
    ),
    openKey = getMenuSelectedKey(location.pathname, getMenuKey(routes.P_A_DASHBOARD), 1);
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);
  const onMenuClick = (param: Record<any, any>) => {
    setSelectedKey(param.key);
  };
  console.log(defaultSelectedKey);
  return (
    <Menu
      theme={'light'}
      mode={'inline'}
      className={'admin-left-menu '}
      selectedKeys={[defaultSelectedKey]}
      defaultOpenKeys={[openKey]}
      items={menus}
      /*onClick={onMenuClick}*/
    />
  );
};
