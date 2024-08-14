const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import the plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: [
        'webpack-hot-middleware/client?reload=true', // Ensures full page reload on HMR fail
        './src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './dist/index.html',
            filename: 'index.html', // This file will be in dist, not public
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css',
            chunkFilename: '[id].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    }
                ],
            },
            {
                test: /\.html$/,
                exclude: /dist\/index.html$/, 
                use: [
                    HtmlWebpackPlugin.loader, 
                    'html-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /dist\/main.css$/, 
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    'sass-loader'
                ]
            }
        ]
    },
    mode: 'development',
    devtool: 'inline-source-map'
};