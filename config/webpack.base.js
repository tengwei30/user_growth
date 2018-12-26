const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const glob = require('glob');
var getEntry = require('./pageEntry')

// var pages = getEntry('./src/*/index.jsx')
// console.log('pages', pages)

const getBasePlugs = (() => {
  const baseWebPackPlugin = []
  const pages = getEntry('./src/*/index.jsx');
  console.log(pages)
  for(pagename in pages) {
    console.log(pagename)
    const pathInfo = pages[pathname]
    const folderName = pathInfo.split('/').splice(-2)[0]
    const fileName = `${folderName}.html`
    
  }
})()


module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      hash: true,
      minify: {
          removeAttributeQuotes:true,
          removeComments: true,
          collapseWhitespace: true,
          removeScriptTypeAttributes:true,
          removeStyleLinkTypeAttributes:true
      }
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',
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