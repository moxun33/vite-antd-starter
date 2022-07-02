/**
 * Created by xun on  2021/10/29 14:35.
 * description: window.d
 */

export {};
declare global {
  interface Window {
    QRLogin: any; //飞书二维码登录SDK
    attachEvent: any;
  }
}
