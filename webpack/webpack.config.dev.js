const Path = require('path')
const Webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const sass = require('sass')
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js',
  },
  devServer: {
    inline: true,
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: Path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/i,
        use: [
          'style-loader',
          'css-loader?sourceMap=true',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: sass,
            },
          },
        ],
      },
    ],
  },
})
