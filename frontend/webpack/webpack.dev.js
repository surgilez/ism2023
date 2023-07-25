const path = require('path')
const fs = require('fs')
const { HotModuleReplacementPlugin } = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { DefinePlugin } = require('webpack')
const { config } = require('dotenv')

config({ path: '.env.development' })

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js'],
      exclude: 'node_modules',
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    open: false,
    compress: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../cert/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../cert/cert.pem')),
    },
    static: {
      directory: path.resolve(__dirname, '../public'),
      watch: true,
    },
  },
}
