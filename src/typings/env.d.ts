/**
 * Created by xun on  2021/12/6 16:46.
 * description: env.d
 */
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_ZY_DOMAIN: string;
  readonly VITE_APP_NAME: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
