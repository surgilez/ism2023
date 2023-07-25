const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = ({ env }) => {
  const envConfig = require(`./webpack.${env}.js`)
  return merge(common, envConfig)
}
