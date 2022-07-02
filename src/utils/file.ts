/**
 * Created by xun on  2021/12/15 10:38.
 * description: file
 */
export const createBlobUrlByBlobRes = (blobRes: any) => {
  const urlCreator = window.URL || window.webkitURL;
  const blob = new Blob([blobRes], { type: blobRes.type });
  return urlCreator.createObjectURL(blob);
};
/**
 *
 * blob二进制 to base64
 **/
export function blobToDataURI(blob: Blob, callback: (v: any) => void) {
  const reader = new FileReader();
  reader.onload = function (e: any) {
    callback(e.target.result);
  };
  reader.readAsDataURL(blob);
}
/**
 *
 * Uint8Array to base64
 **/
export function uint8ArrayToDataURI(arr: Uint8Array, callback: (e: any) => void) {
  const reader = new FileReader();
  reader.onload = function (e: any) {
    callback(e.target.result);
  };
  reader.readAsDataURL(new Blob([new Uint8Array(arr)]));
}
