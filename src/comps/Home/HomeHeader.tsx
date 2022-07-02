/**
 * Created by xun on  2021/8/23 16:30.
 * description: menu
 */
import { NavHeaderUsername } from '@/comps/Common/Nav/header';
import { P_RPA_INDEX } from '@/consts/routes';
import React, { CSSProperties } from 'react';
import { Menu, Layout, MenuProps, Affix } from 'antd';
import { Link } from 'react-router-dom';
import { RobotOutlined } from '@ant-design/icons';

const iconStyle: CSSProperties = { fontSize: 16, fontWeight: 'bold' };
//key 须对应 type NavEnv
export const APP_MENU_OPTS: MenuProps['items'] = [
  {
    key: 'app',
    label: <Link to={P_RPA_INDEX}>APP</Link>,
    icon: <RobotOutlined style={iconStyle} />
  }
];

export const AppNavHeader = () => {
  const menus = [...APP_MENU_OPTS];

  return (
    <Affix>
      <Layout.Header style={{ background: 'white', zIndex: 10 }} className={'flex-space-between'}>
        LOGO
        <div style={{ minWidth: 700 }}>
          <Menu
            style={{ ...iconStyle }}
            mode="horizontal"
            theme={'light'}
            className={'nav-menu'}
            selectedKeys={window.location.pathname.split('/')}
            items={menus}
          />
        </div>
        <div style={{ textAlign: 'right' }}>
          <NavHeaderUsername />
        </div>
      </Layout.Header>
    </Affix>
  );
};
