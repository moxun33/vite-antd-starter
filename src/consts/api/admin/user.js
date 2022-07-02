/**
 * Created by xun on  2020/9/27 15:31.
 * description: user
 */

// 获取用户列表 get ⇩
export const USER_LIST_USERS = '/user/listUsers';
export const USER_INFO = '/user/getUserInfo';
// 添加或修改用户 post ⇩
export const USER_EDIT = '/user/editUser';
// 删除用户 get ⇩
export const USER_DELETE = '/user/deleteUser';

// 获取角色列表 get ⇩
export const USER_LIST_ROLES = '/role/listRoles';

// 添加或修改角色 post ⇩
export const USER_EDIT_ROLE = '/role/editRole';

// 删除角色 get ⇩
export const USER_DELETE_ROLE = '/role/deleteRole';

// 重置密码 get ⇩
export const USER_RESET_PASSWORD = '/user/resetPassword';

// 同步 角色 post ⇩
export const USER_SYNC_ROLES = '/user/syncRoles';

// 获取指定角色的用户列表 get ⇩
export const USER_FIND_USERS_BY_ROLES = '/user/findUsersByRoles';

//统计用户的业务信息
export const USER_COUNT_BUSINESS = '/user/countBusiness';

// 获取 列表 get ⇩
export const ASSET_LIST_BY_USER = '/org/getAssetList';
