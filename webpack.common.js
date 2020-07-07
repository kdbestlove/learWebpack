// webpack公共配置项
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        main: './src/main.js',
        home: './src/home/js/home.js',
        history: './src/history/js/history.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',                   //本地自定义模板
            filename: 'index.html',                         //打包后的文件名,  可(home/index.html) 生成home文件夹/index.html文件
            title: 'main',
            inject: true,                                   //将js插入body底部
            chunks: ['main'],                               // 按需引入对应名字的js文件
            minify: false
        }),
        new HtmlWebpackPlugin({
            template: './src/home/home.html',               //本地自定义模板
            filename: 'home/home.html',                     //打包后的文件名,  可(home/index.html) 生成home文件夹/index.html文件
            title: '主页',
            inject: true,                                   //将js插入body底部
            chunks: ['home'],                               // 按需引入对应名字的js文件
            minify: false
        }),
        new HtmlWebpackPlugin({
            template: './src/history/history.html',         //本地自定义模板
            filename: 'history/history.html',
            title: '历史',
            inject: true,                                   //将js插入body底部
            chunks: ['history'],                            // 按需引入对应名字的js文件
            minify: false
        }),
        // 如果需要lodash变量的模块实例,从lodash package 包引进来，并将其提供给需要用到它的模块
        new webpack.ProvidePlugin({
            _: 'lodash'
            // join: ['lodash', 'join']
        }),
        new ExtractTextPlugin("[name].css"),
    ],
    output: {
        // filename: 'bundle.js',
        // filename: '[name].bundle.js',
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    // resolve: {
    //     extensions: ['.tsx', '.ts', '.js']
    // },
    module: {
        rules: [
        {
            test: /\.(html)$/,
            use: {
                loader: 'html-loader'
            }
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
        {
            test: /\.(c|sc)ss$/,
            // use: [
            //     'style-loader',
            //     'css-loader'
            // ]
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",                   // 这里表示不提取的时候，使用什么样的配置来处理css
                use: ['css-loader','sass-loader'],           // 提取的时候，继续用下面的方式处理
            })
        },
        // {
        //     test: /\.css$/,
        //     use: ExtractTextPlugin.extract({
        //         fallback: "style-loader",   // 这里表示不提取的时候，使用什么样的配置来处理css
        //         use: "css-loader"           // 提取的时候，继续用下面的方式处理
        //     })
        // },
        // {
        //     test: /\.scss$/,
        //     use: ExtractTextPlugin.extract({
        //         use: ['css-loader','sass-loader'],
        //         // 在开发环境使用 style-loader
        //         fallback: "style-loader"
        //     })
        // },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,                    //图片大小限制 单位b
                        outputPath: "static",           //打包路径
                        name: '[name]_[hash:7].[ext]',  //生成的文件名
                        publicPath: 'static/'
                    }
                }
            ],
            // use: [
            //     'file-loader'
            // ]
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