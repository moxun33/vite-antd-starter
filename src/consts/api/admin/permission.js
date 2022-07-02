/**

 * Created By apiBot on 9/27/2020, 5:42:27 PM.

 * Description: permission-controller
 */
// 删除 权限 get ⇩
export const PERMISSION_DELETE = '/permission/deletePermission';
// 编辑 权限 post ⇩
export const PERMISSION_EDIT = '/permission/editPermission';
// 批量编辑 权限 post ⇩
export const PERMISSION_EDIT_BATCH = '/permission/editPermissionBatch';
// 获取 模块列表 get ⇩
export const PERMISSION_GET_MODULE_LIST = '/permission/getModuleList';
// 获取 权限列表 get ⇩
export const PERMISSION_GET_LIST = '/permission/getPermissionList';
// 获取 指定角色的权限列表 get ⇩
export const GET_PERMISSIONS_BY_ROLE = '/permission/getPermissionsByRole';
// 授权指定角色 post ⇩
export const PERMISSION_GRANT = '/permission/grant';

// 同步 权限 post ⇩
export const PERMISSION_SYNC_PERMISSIONS = '/permission/syncPermissions';

// 同步 权限分配 post ⇩
export const PERMISSION_SYNC_GRANT = '/permission/syncGrant';

// 获取 指定权限的用户列表 get ⇩
export const PERMISSION_GET_USERS_BY = '/permission/getUsersByPermission';
