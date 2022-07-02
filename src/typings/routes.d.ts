/**
 * Created by xun on  2021/8/23 16:10.
 * description: routes
 */
interface IRoutes extends IObject {
  key?: string;
  path: string;
  strict?: boolean;
  exact?: boolean;
  render?: (p: any) => void;
  component?: any;
  ignoreAuth?: boolean; //无需认证
  routes?: IRoutes[];
  userInfo?: User;
}

interface IMenuOpts {
  text: string;
  path: string;
  key: string;
  icon?: any;
}
