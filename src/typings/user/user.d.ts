/**
 * Created by xun on  2022/5/18 11:20.
 * description: user.d
 */
interface User {
  userId: string;
  loginAccount: string;
  name: string;
  avatar: string;
  token: string;
  roles: string[];
  permissions: string[];
}
