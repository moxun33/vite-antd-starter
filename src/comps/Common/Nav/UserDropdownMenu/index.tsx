/**
 * Created by xun on 2017/11/20.
 */

import { AppstoreOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuProps } from 'antd';

import { PATH_ACCOUNT_LOGIN, PATH_ADMIN_INDEX } from '@/consts/routes';

export default class UserDropdownMenu extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.menuItems = this.getMenuItems();
  }
  menuItems: MenuProps['items'];
  state = {
    passwordVisible: false
  };
  static propTypes = {};
  static defaultProps = {};
  handleLogout = () => {
    localStorage.clear();
    window.location.href = `${PATH_ACCOUNT_LOGIN}?from=logout`;
  };
  onRightMenuClick = (e: any) => {
    const key = e.key;
    switch (key) {
      case 'logout':
        this.handleLogout();
        break;
      case 'changePasswd':
        this.setState({ passwordVisible: true });
        break;
      default:
        break;
    }
  };
  cancelModal = () => {
    this.setState({ passwordVisible: false });
  };
  getMenuItems = () => {
    const shouldShoHomeBtn = window.location.pathname.startsWith(PATH_ADMIN_INDEX);
    const items: MenuProps['items'] = [
      { icon: <LogoutOutlined />, key: 'logout', label: <a>退出登录</a> }
    ];
    if (shouldShoHomeBtn) {
      items.unshift({
        icon: <HomeOutlined />,
        key: 'home',
        label: <Link to={'/'}> 进入前台</Link>
      });
    } else {
      //if (hasPermissions(PERMISSION_KEYS.ADMIN)) {
      items.unshift({
        icon: <AppstoreOutlined />,
        key: 'admin',
        label: <Link to={PATH_ADMIN_INDEX}> 进入后台</Link>
      });
      // }
    }
    console.log(items);
    return items;
  };
  render() {
    return (
      <div>
        <Menu items={this.menuItems} onClick={this.onRightMenuClick} />
      </div>
    );
  }
}
