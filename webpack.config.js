const { resolve } = require('path')
const Webpack = require('webpack')

const port = process.env.APP_PORT || 4044
const dist = resolve(__dirname, 'dist')
const src = resolve(__dirname, 'app')

module.exports = {
  entry: {
    app: [ resolve(src, 'app.ts') ]
  },
  output: {
    filename: 'bundle.js',
    path: dist,
    publicPath: '/'
  },
  devtool: 'eval',
  node: {
    fs: 'empty'
  },

  devServer: {
    hot: true,
    contentBase: src,
    port: port,
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [ /\.vue$/ ]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: 'vue-style-loader!css-loader'
          }
        }
      },
      {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader?importLoader=1&localIdentName=[name]__[local]__[hash:base64:5]' ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },

  resolve: {
    extensions: [ '.js', '.ts' ],
    alias: {
      vue$: 'vue/dist/vue.common.js'
    }
  },

  plugins: [ new Webpack.HotModuleReplacementPlugin() ]
}
