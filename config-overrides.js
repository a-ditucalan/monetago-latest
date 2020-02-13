// const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = function override(config) {
  config.module.rules[1].use[0].options.configFile = './.eslintrc.json'
  config.module.rules[1].use[0].options.fix = true
  config.plugins.push(
    new StyleLintPlugin({
      configFile: './stylelint.config.js',
      fix: true
    }))
  // config = {
  //   // devServer: {
  //   //   inline: true,
  //   //   port: 3000,
  //   //   disableHostCheck: true,
  //   //   headers: {
  //   //     'Access-Control-Allow-Origin': '*',
  //   //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  //   //     'Access-Control-Allow-Headers':
  //   //       'X-Requested-With, content-type, Authorization'
  //   //   },
  //   //   proxy: {
  //   //     '/v1/di/api': {
  //   //       target: {
  //   //         host: '13.124.19.114',
  //   //         protocol: 'http:',
  //   //         port: 8080
  //   //       },
  //   //       pathRewrite: {
  //   //         '^/api': ''
  //   //       }
  //   //     }
  //   //   }
  //   // },
  //   module: {
  //     rules: [
  //       // {
  //       //   enforce: 'pre',
  //       //   test: /\.(js)$/,
  //       //   exclude: /node_modules/,
  //       //   loader: 'eslint-loader',
  //       //   options: {
  //       //     configFile: './.eslintrc.json',
  //       //     fix: true
  //       //   }
  //       // },
  //       // {
  //       //   test: /\.(js)$/,
  //       //   exclude: /node_modules/,
  //       //   loader: 'babel-loader',
  //       //   options: {
  //       //     presets: [
  //       //       [
  //       //         "@babel/preset-env",
  //       //         {
  //       //           "debug": true,
  //       //           "useBuiltIns": "entry",
  //       //           "corejs": 3.1
  //       //         }
  //       //       ],
  //       //       '@babel/react',
  //       //       {
  //       //         plugins: ['@babel/plugin-proposal-class-properties']
  //       //       }
  //       //     ]
  //       //   }
  //       // },
  //       {
  //         test: /\.(css)$/,
  //         use: ['style-loader', 'css-loader', 'sass-loader']
  //       },
  //       // {
  //       //   test: /\.svg$/,
  //       //   loader: 'svg-url-loader'
  //       // },
  //       {
  //         test: /\.s[ac]ss$/i,
  //         use: ['style-loader', 'css-loader', 'sass-loader']
  //       },
  //       // {
  //       //   test: /\.(png|jp(e*)g)$/,
  //       //   use: [
  //       //     {
  //       //       loader: 'url-loader',
  //       //       options: {
  //       //         esModule: false
  //       //       }
  //       //     }
  //       //   ]
  //       // },

  //       // {
  //       //   test: /\.(woff|woff2|eot|ttf)$/,
  //       //   loader: 'url-loader'
  //       // }
  //     ]
  //   },
  //   // mode: 'development',
  //   plugins: [
  //     new HtmlWebpackPlugin({
  //       template: './public/index.html'
  //     }),
  //     new StyleLintPlugin({
  //       configFile: './stylelint.config.js',
  //       fix: true
  //     })
  //   ]
  // }

  return config
}
