// webpack 开发环境配置项 + merge插件引入的common公共配置项
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',//告诉服务器从哪里提供内容
        proxy:{
            '/institute': {
                target: 'http://192.168.0.149:8089',
                changeOrigin: true,
                pathRewrite: {
                    '^/institute': ''
                }
            }
        }
    },
});