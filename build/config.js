'use strict'

const path = require('path')
const webpackPathCommon = require('./webpack.common.config')

module.exports = {
  NORMAL_PAGE_PATH: webpackPathCommon.NORMAL_PAGE_PATH,
  STATIC_JS_NAME: webpackPathCommon.STATIC_JS_NAME,
  STATIC_TEMPLATE_NAME: webpackPathCommon.STATIC_TEMPLATE_NAME,
  OUT_PUT_FOLDER_NAME: webpackPathCommon.OUT_PUT_FOLDER_NAME,
  dev: {
    // Paths
    assetsSubDirectory: webpackPathCommon.OUT_PUT_HTML_FOLDER,
    assetsPublicPath: '/',
    // 默认端口
    port: 9000,
    // 自动打开浏览器
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    /**
     * https://webpack.docschina.org/configuration/dev-server/#devserver-proxy
     * 开发环境跨域配置, 默认关闭, 配置如下
     * 请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users
     * pathRewrite重写路径
    */
    // proxyTable: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {
    //       '^/api' : ''
    //     }
    //   }
    // }
    proxyTable: {}
  },
  build: {
    assetsRoot: path.resolve(__dirname, `../${webpackPathCommon.OUT_PUT_FOLDER_NAME}`),
    assetsSubDirectory: webpackPathCommon.OUT_PUT_HTML_FOLDER,
    /**
     * assetsPublicPath 设置的
     * 默认情况下，该配置方案假设你的应用是被部署在一个域名的根路径上例如 https://www.my-app.com/
     * 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径
     * 例如，如果你的应用被部署在 https://www.my-app.com/my-app/
     * 则设置 baseUrl 为 /my-app/
     * @desc
     * 由于需要部署在git-pages 所以改配置临时改为/webpack-seed/
    */
    // 打包时 npm run build:git 该命令会打包的路径会自动带上项目地址/webpack-seed/
    // 普通打包(大部分) npm run build 默认 '/'
    // 该命令具体请看package.json scripts命令配置
    assetsPublicPath: webpackPathCommon.BUILD_PATH,
    productionSourceMap: false,
    devtool: '#source-map',
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
