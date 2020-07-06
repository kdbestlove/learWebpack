const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动生成打包后dist下的index.html,所有的bundle会自动添加到html中
const { CleanWebpackPlugin } = require("clean-webpack-plugin");//每次构建前清理 /dist 文件夹(此处官方文档不对)
const webpack = require('webpack');
module.exports = {
    entry: {
        app: './src/index.js',
        vendor: [
            'lodash'
        ]
        // print: './src/print.js'
    },
    output: {
        // filename: 'bundle.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        // 別名
        alias: {}
    },
    devtool: 'inline-source-map',// 开启前，打包会把多个文件合并一个js，无法准备找到报错位置，source-map会准备知道问题出在哪
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    }
};