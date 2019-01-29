/**
 * vue-cli3 webpack基本配置
 */
const Config = {
  baseUrl: 'app', // 二级目录
  outputDir: '/dist', // 打包目录
  productionSourceMap: true, // 是否生成source map
  /**
   * config 参数为已经解析好的 webpack 配置
   * 使用webpack-merge 插件合并配置
   * 下面是一个修改图片大小限制的例子
   */

  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options =>
        merge(options, {
          limit: 5120
        })
      );
  },
  /**
   * config 参数为已经解析好的 webpack 配置
   * chainWebpack 是链式修改
   * configureWebpack 更倾向于整体替换和修改
   */
  configureWebpack: config => {
    // config.plugins = []; // 这样会直接将 plugins 置空

    // 使用 return 一个对象会通过 webpack-merge 进行合并，plugins 不会置空
    return {
      plugins: []
    };
  },
  devServer: {
    open: true, // 是否自动打开浏览器页面
    host: '0.0.0.0', // 指定使用一个 host。默认是 localhost
    port: 8080, // 端口地址
    https: false, // 使用https提供服务
    proxy: null, // string | Object 代理设置

    // 提供在服务器内部的其他中间件之前执行自定义中间件的能力
    before: app => {
      // `app` 是一个 express 实例
    }
  }
};

module.exports = Config;
