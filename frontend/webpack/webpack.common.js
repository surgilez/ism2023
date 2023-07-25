const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin')

const srcFolder = path.resolve(__dirname, '..', 'src')
const src = path.resolve(__dirname, '..', 'src', 'app')
const publicFolder = path.resolve(__dirname, '..', 'public')

module.exports = {
  entry: path.resolve(srcFolder, 'index.tsx'),
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|ico|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(publicFolder, 'index.html'),
    }),
    new NodePolyfillWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@redux': path.resolve(src, 'redux'),
      '@helpers': path.resolve(src, 'helpers'),
      '@modules': path.resolve(src, 'modules'),
      '@routes': path.resolve(src, 'routes'),
      '@utils': path.resolve(src, 'utils'),
      '@assets': path.resolve(src, 'assets'),
      '@context': path.resolve(src, 'context'),
      '@landing': path.resolve(src, 'modules', 'landing'),
      '@admin': path.resolve(src, 'modules', 'admin'),
      '@seller': path.resolve(src, 'modules', 'seller'),
      '@client': path.resolve(src, 'modules', 'client'),
      '@chat': path.resolve(src, 'modules', 'chat'),
      '@shopping': path.resolve(src, 'modules', 'shopping'),
      '@api': path.resolve(src, 'api'),
    },
  },
  stats: 'errors-only',
}
