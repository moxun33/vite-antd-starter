/**
 * Created By xun  on 2019-05-16 11:50.
 * Description: menu
 */
import { Badge, Menu } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import { splitValidArray } from './function';
import { hasPermissions } from './permissions';
const { SubMenu } = Menu;
const MENU_RENDER_OPTS = {
  showSubIcon: false,
  subAntdIcon: false,
  iconStyle: {},
  antdIcon: false,
  showIcon: true,
  fromSub: false,
  collapsed: false,
  popupClassName: 'mx-popup-menu'
};
const renderImgIcon = (icon: any, info: IObject = {}) => (
  <img
    alt={'icon'}
    className={'mx-menu-item-icon'}
    src={icon}
    style={{ maxHeight: 14, maxWidth: 14, marginRight: 10, ...info.iconStyle }}
  />
);
// 设置菜单图标
const renderMenuItemIcon = (info: IObject = {}, options: IObject = MENU_RENDER_OPTS) => {
  if (!(info.icon && (options.showIcon || options.showSubIcon))) {
    return;
  }
  return options.antdIcon || (options.subAntdIcon && options.fromSub) ? (
    <info.icon style={info.iconStyle} />
  ) : (
    renderImgIcon(info.icon, info)
  );
};
//渲染菜单未读数量
const renderMenuUnreadNum = (num: number, className = '') => {
  if (num < 1) {
    return '';
  }
  const numText = num > 99 ? '99+' : num.toString();
  return (
    <div className={'mx-menu-unread-num ' + className}>
      <span className={`mx-menu-unread-num-${numText.length}`}>{numText}</span>
    </div>
  );
};
const renderMenuBadge = (num: number, badgeProps: IObject = {}) => {
  if (num < 1) {
    return '';
  }
  return (
    <Badge
      className={`home-horizontal-menu-badge ${badgeProps.className || ''}`}
      count={num}
      {...badgeProps}
    />
  );
};
/**
 * 循环渲染多个菜单选项
 * data的最小化配置格式 [{key：’key‘，path:'/path',text:'菜单名'}]
 * */
export const renderMenuItem = (data: IObject[] = [], options: IObject = MENU_RENDER_OPTS) => {
  return data.map((s, i) => {
    const key = s.key || splitValidArray(s.path).pop(),
      { permissions } = s;
    if (
      Array.isArray(permissions) &&
      permissions.length > 0 &&
      !hasPermissions(permissions, true)
    ) {
      return;
    }
    return (
      <Menu.Item title={s.tooltip || s.text || s.title} key={key}>
        <Link to={s.path}>
          <div className={'mx-menu-item-flex'}>
            <div>
              {renderMenuItemIcon(s, options)}
              <span>{s.text || s.title}</span>
            </div>
            {renderMenuBadge(s.unreadNum)}
          </div>
        </Link>
      </Menu.Item>
    );
  });
};
const renderCollapsedSubmenu = (icon: any, unreadNum = 0) => {
  return unreadNum > 0 ? (
    <Badge dot offset={[8, 0]}>
      {renderImgIcon(icon)}
    </Badge>
  ) : (
    renderImgIcon(icon)
  );
};
export const renderSubMenuWithItem = (obj: IObject = {}, options: IObject = MENU_RENDER_OPTS) => {
  const { unreadNum, children, permissions } = obj;

  if (!hasPermissions(permissions, true)) {
    return;
  }
  return (
    <SubMenu
      popupClassName={options.popupClassName}
      key={obj.key}
      title={
        options.collapsed ? (
          renderCollapsedSubmenu(obj.collapsedIcon, unreadNum)
        ) : (
          <div className={'mx-menu-item-flex'}>
            <div>
              {renderMenuItemIcon(obj, { ...options, fromSub: true })}
              <span>{obj.text}</span>
            </div>
            {renderMenuBadge(unreadNum)}
          </div>
        )
      }>
      {renderMenuItem(children, options)}
    </SubMenu>
  );
};
//根据本地定义的菜单路由，提取key
export const extractMenuPathKey = (path: string, index = 1) => {
  const arr = path.split('/').filter(Boolean);
  return arr[index];
};
