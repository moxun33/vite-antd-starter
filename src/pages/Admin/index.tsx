/**
 * Created by xun on 2020/12/25 12:01.
 * description: index
 */

import React, { Component } from 'react';

import { Layout } from 'antd';
import renderRoutes from '@/routers/renderRoutes';
import { AdminLeftMenu } from './menu';

import AdminHeaders from './AdminHeaders';

export default class AdminIndex extends Component<any, any> {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <Layout className={'mx-admin-page'}>
        <AdminHeaders />
        <Layout className={'mx-admin-layout'}>
          <Layout.Sider theme={'light'} className={'mx-admin-sider'}>
            <AdminLeftMenu />
          </Layout.Sider>
          <Layout.Content className={'mx-admin-content mx-content'}>
            {renderRoutes(this.props.route.routes, this.props.route.userInfo)}
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
