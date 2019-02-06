// webpack v4
const path = require('path');
// update 23.12.2018
// const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => ({
    entry: {
        main: './src/main.js'
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        chunkFilename:
            argv.mode === 'production'
                ? 'chunks/[name].[chunkhash].js'
                : 'chunks/[name].js',
        filename:
            argv.mode === 'production' ? '[name].[chunkhash].js' : '[name].js'
    },
    // target: "node",
    // externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new MiniCssExtractPlugin({
            filename:
                argv.mode === 'production'
                    ? '[name].[contenthash].css'
                    : '[name].css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
        new CopyWebpackPlugin([
            // {
            //     from: './src/assets',
            //     to: './assets'
            // },
            // {
            //     from: 'manifest.json',
            //     to: 'manifest.json'
            // }
        ]),
        new CompressionPlugin({
            algorithm: 'gzip'
        })
    ],
    devServer: {
        contentBase: 'dist',
        watchContentBase: true,
        port: 1000
    }
});
