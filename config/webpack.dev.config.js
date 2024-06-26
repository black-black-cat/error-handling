/*
 * webpack 配置
 */
var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var fileVersion = new Date().getTime();

module.exports = {
    entry: {
        monitorjs: ['./src/index.js']
    },

    output: {
        publicPath: '',
        path: path.resolve(__dirname, '../dist'), //打包后的文件存放的地方
        filename: '[name].js', //打包后输出文件的文件名
        chunkFilename: '[name].js',
        library: 'monitorjs', //类库名称
        libraryTarget: 'umd', //指定输出格式
        umdNamedDefine: true //会对UMD的构建过程中的AMD模块进行命名，否则就使用匿名的define
    },

    resolve: {
        extensions: ['.js']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0'],
                        plugins: ['transform-runtime']
                    }
                },
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            },
            fileVersion: fileVersion //文件版本
        })
    ]
};
