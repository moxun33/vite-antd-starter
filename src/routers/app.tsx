/**
 * Created by xun on  2021/8/23 16:22.
 * description: app
 */
import { PERMISSION_KEYS } from '@/consts/permissions';
import { P_RPA_INDEX, PATH_ADMIN_INDEX } from '@/consts/routes';
import * as routes from '@/consts/routes';
import React from 'react';
import { Redirect } from 'react-router-dom';
//import SiteNav from '../pages/SitesNav';

import AsyncComponent from '../comps/AsyncComponent';
import { ADMIN_ROUTES } from './admin';

export const APP_ROUTERS_CFG: IRoutes[] = [
  {
    path: '/',
    exact: true,
    //@ts-ignore
    render: () => <Redirect to={P_RPA_INDEX} />
  },
  {
    path: '/auth',
    exact: true,
    ignoreAuth: true,
    component: AsyncComponent(() => import('../pages/Auth'))
  },

  {
    path: P_RPA_INDEX,
    component: AsyncComponent(() => import('../pages/Home'))
  }

  /*  {
    path: PATH_ADMIN_INDEX,
    component: AsyncComponent(() => import('@/pages/Admin')),
    permissions: [PERMISSION_KEYS.ADMIN],
    routes: ADMIN_ROUTES
  }*/
];
