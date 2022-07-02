/**
 * Created by xun on  2021/11/9 9:08.
 * description: version 指定插件版本字段管理l 更改package.json和manifest.json的version字段
 */
import { resolve } from 'path';
// @ts-ignore
import * as fs from 'fs-extra';
// @ts-ignore
import * as incVer from 'semver/functions/inc';
// @ts-ignore
import minimist from 'minimist';

(async function () {
  const argvs = minimist(process.argv.slice(2)),
    release = argvs.release || 'patch';

  console.log('版本发布类型：', release);
  const pkgFile = resolve('package.json'),
    pkgFileObj = await fs.readJSON(pkgFile);
  const ver = pkgFileObj.version || '1.0.0',
    nextVer = incVer(ver, release) || '1.0.0';
  console.log(ver, '已构建完毕。', '下一版本：', nextVer);
  pkgFileObj.version = nextVer;
  const options = { EOL: '\n', spaces: 2 };
  await fs.writeJSON(pkgFile, pkgFileObj, options);
  console.log('更新版本号完毕！');
})();
