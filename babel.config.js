/**
 * Created by xun on  2022/7/2 16:10.
 * description: babel.config
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: true
        }
      }
    ]
  ]
};
