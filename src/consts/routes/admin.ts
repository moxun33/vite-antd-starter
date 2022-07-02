/**
 * Created by xun on  2021/7/30 9:45.
 * description: A
 */
const initRoute = (paths: string[] = []) => `/admin/${paths.join('/')}`;

//后台配置
export const ADMIN_KEY = 'admin';
export const P_A_CONFIG = initRoute([]); //后台配置
//用户模块
export const P_A_DASHBOARD = initRoute(['dashboard']);
export const P_A_USER = initRoute(['user']);
export const P_A_USER_MGT = initRoute(['user', 'userMgt']);
export const P_A_ROLE_MGT = initRoute(['user', 'roleMgt']);
export const P_A_ROLE_ASSIGN = initRoute(['user', 'roleAssign']);
export const P_A_PERMISSION_MGT = initRoute(['user', 'permissionMgt']);
export const P_A_PERMISSION_ASSIGN = initRoute(['user', 'permissionAssign']);
//组织架构
export const P_A_ORG = initRoute(['org']);
export const P_A_ORG_STRUCT = initRoute(['org', 'arch']);
export const P_A_ORG_POSITION = initRoute(['org', 'positions']);
//系统设置
export const P_A_SETTINGS = initRoute(['settings']);
export const P_A_SETTINGS_ENV = initRoute(['settings', 'env']);
