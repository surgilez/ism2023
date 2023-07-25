const { DefinePlugin, ContextReplacementPlugin } = require('webpack')
require('dotenv').config({ path: '.env.production' })
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

module.exports = {
  mode: 'production',
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin(),
    new ContextReplacementPlugin(/dist[\\\/]locale$/, /^\.\/(en|es)$/),
  ],
  output: {
    path: path.resolve(__dirname, '..', './stage'),
    filename: 'bundle.js',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: false },
          },
        ],
      },
    ],
  },
}
