const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main-bundle-[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: './template.html'
    }),
  ]
})