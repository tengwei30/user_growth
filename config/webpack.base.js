const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const glob = require('glob');
const getEntry = require('./pageEntry')
const paths = require('./paths.js')
const _ = require('lodash')

const isProd = process.env.NODE_ENV === 'production'

let watchPagePath = `./src/**/index.js`

var entries = getEntry(watchPagePath)
// 数组的每一项都是 static 文件夹下的js filename，添加后可以在所有页面中混入
// 推荐加入一些体积较小，所有页面都需要使用的static js 文件
var commonJS = [
  /* 'picturefill.min.js' */
]

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function mergeCommonJs (entries) {
  if (!_.isObject(entries) || _.isEmpty(commonJS)) {
    return entries
  }

  var getCommonJsPath = function (name) {
    if (_.isArray(name)) {
      return _.map(name, x => resolve(`static/${name}`))
    }
    return resolve(`static/${name}`)
  }

  return _.mapValues(entries, x => getCommonJsPath(commonJS).concat(x))
}

const getBasePlugs = (() => {
  const baseWebPackPlugin = []
  const pages = getEntry('./src/*/index.jsx');
  for(pathname in pages) {
    const pathInfo = pages[pathname]
    const folderName = pathInfo.split('/').splice(-2)[0]
    const fileName = `${folderName}.html`
    const conf = {
      filename: isProd ? path.resolve(paths.appBuild, fileName) : fileName,
      staticPath: staticPath,
      template: paths.appHtml,
      inject: true,
      hash: false,
      minify: isEnvProduction ? {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      } : false
    }
    baseWebPackPlugin.push(new HtmlWebpackPlugin(conf))
  }
  return baseWebPackPlugin
})


module.exports = {
  entry: mergeCommonJs(entries),
  plugins: [
    new CleanWebpackPlugin(['dist']),
    getBasePlugs()
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  }
};