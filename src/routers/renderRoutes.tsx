/**
 * Created by xun on  2020/9/14 16:02.
 description: renderRoutes
 */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AsyncComponent from '../comps/AsyncComponent';

const NotFoundRoute = (
  // @ts-ignore
  <Route path={'*'} exact component={AsyncComponent(() => import('../pages/404'))} />
);
/**
 * 将路由配置渲染成节点
 * @param routes switch路由列表, 参考react-router-config
 * @param userInfo 已登录的用户信息
 * @param multipleRoutes 非switch路由列表，将会在Switch节点前渲染Route
 * @param extraProps 添加额外的Route props
 * @param switchProps Switch props
 */
// 顶层使用路由渲染，第二参数<可选>:当前登录用户的权限
//renderRoutes(routes,user.authed)
// 子层组件路由渲染，第二参数若不通过props.route.authed获取顶层传的user.authed，则默认可访问该routes列表下的所有路由
//renderRoutes(props.route.routes,<props.route.authed>,<props.route.multipleRoutes>,...)

function renderRoutes(
  routes: IRoutes[],
  userInfo: User = {} as User,
  multipleRoutes: any[] = [],
  extraProps: IObject = [],
  switchProps: IObject = []
) {
  const list = [];
  const authed = userInfo.loginAccount && userInfo.name && userInfo.token;
  const mapFunc = (R: any[]) =>
    R.map((route: IRoutes, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props: IObject) => {
          // 将authed赋值到route，试子组件可以通过route.authed获取当前用户权限
          if (authed) route.userInfo = userInfo;
          if (!route.ignoreAuth && !authed && !route.path.startsWith('/auth')) {
            return <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />;
          }
          /*     if (!hasPermissions(route.permissions)) {
            if (i + 1 < R.length) {
              //自动跳转下一路由
              const nextRoute = R[i + 1];
              return <Redirect to={{ pathname: nextRoute.path, state: { from: route.path } }} />;
            }
            return NotFoundRoute;
          }*/
          return route.render
            ? route.render({ ...props, ...extraProps, route: route })
            : route.component && <route.component {...props} {...extraProps} route={route} />;
        }}
      />
    ));
  if (routes) {
    list.push(
      <Switch {...switchProps} key="MxSwitchRoute">
        {mapFunc(routes)}
        {NotFoundRoute}
      </Switch>
    );
    // 将非Switch包裹的Route挂载到Switch节点之前
    multipleRoutes && list.unshift(...mapFunc(multipleRoutes));
    // 返回一个数组，[<Route/>,...,<Route/>,<Switch>...</Switch>]（实际元素并非如此结构，此处仅为方便说明写的伪代码），React会将数组渲染成节点
    return list;
  }
}

export default renderRoutes;
