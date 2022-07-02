/**
 * Created by xun on  2021/5/8 15:52.
 * description: header
 */
import { getLocalUserInfo } from '@/utils/storage';
import { Affix, Avatar, Button, Dropdown, Layout } from 'antd';
import UserDropdownMenu from './UserDropdownMenu';
import React from 'react';

import { UserOutlined } from '@ant-design/icons';

//用户名渲染
export const NavHeaderUsername: React.FC<any> = () => {
  const info = getLocalUserInfo(),
    { name, avatar } = info;
  const txt = name ? (name.length > 6 ? `${name.slice(0, 6)}...` : name) : '未知用户';

  return (
    <Dropdown
      overlay={<UserDropdownMenu />}
      className={'username-dropdown'}
      //trigger={['click']}
    >
      <Button
        type={'link'}
        style={{ height: 48, fontSize: 16, fontWeight: 'bold', color: '#333' }}
        className={'content-head-username'}
        title={name}>
        {avatar ? (
          <Avatar
            size={40}
            src={`data:image/png; base64,${avatar}`}
            style={{ marginRight: 5, marginTop: -2 }}
          />
        ) : (
          <UserOutlined />
        )}
        <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>{txt}</span>
      </Button>
    </Dropdown>
  );
};

//导航布局
export const NavHeaderLayout: React.FC<any> = ({ children, wrapClassName = '' }) => (
  <Affix>
    <Layout.Header style={{ background: 'white' }} className={'flex-space-between'}>
      LOGO
      <div style={{ minWidth: 500 }}>{children || ''}</div>
      <div style={{ textAlign: 'right' }}>
        <NavHeaderUsername />
      </div>
    </Layout.Header>
  </Affix>
);
