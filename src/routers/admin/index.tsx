/**
 * Created by xun on  2020/9/14 17:13.
 description: home
 */
import AsyncComponent from '@/comps/AsyncComponent';
import * as adminRoutes from '@/consts/routes/admin';
import React from 'react';
import { Redirect } from 'react-router-dom';
export const ADMIN_ROUTES = [
  {
    path: '/admin',
    exact: true,
    render: () => <Redirect to={adminRoutes.P_A_DASHBOARD} />
  },
  {
    path: adminRoutes.P_A_DASHBOARD,
    component: AsyncComponent(() => import('@/pages/Admin/Dashboard'))
  }
];
