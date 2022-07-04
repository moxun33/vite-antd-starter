/**
 * Created by xun on  2021/12/3 11:52.
 * description: hlc-store
 */
import { getLocalUserInfo } from '@/utils/storage';

import { proxy } from 'valtio';

const store = proxy({
  authed: !!getLocalUserInfo().userId && !!getLocalUserInfo().token,
  toggleAuth: (v: boolean) => (store.authed = v),
  loading: false
});
export default store;
