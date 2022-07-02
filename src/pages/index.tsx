import { Layout } from 'antd';
import React from 'react';
import { APP_ROUTERS_CFG } from '@/routers/app';
import renderRoutes from '../routers/renderRoutes';
import { getLocalUserInfo } from '@/utils/storage';
import { AppNavHeader } from '@/comps/Home/HomeHeader';
const { Content } = Layout;

const ModulesIndex: React.FC<any> = () => {
  const pathname = window.location.pathname;
  if (pathname.startsWith('/admin') || pathname.startsWith('/auth')) {
    return <div className={'app-layout'}>{renderRoutes(APP_ROUTERS_CFG, getLocalUserInfo())}</div>;
  }

  return (
    <Layout className={'app-layout'}>
      <AppNavHeader />

      <Content style={{ minHeight: 'calc(100vh - 70px)' }}>
        {renderRoutes(APP_ROUTERS_CFG, getLocalUserInfo())}
      </Content>
    </Layout>
  );
};

export default ModulesIndex;
