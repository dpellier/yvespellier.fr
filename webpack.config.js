
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: './src/index.jsx',
    output: {
        filename: process.env.WEBPACK_SERVE ? '[name].js' : '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: process.env.MODE === 'development' ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin( [
            { from: path.resolve(__dirname, 'src/assets/images'), to: 'images' }
        ]),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            favicon: './src/assets/images/favicon.png',
            filename: './index.html',
            env: process.env.NODE_ENV
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: process.env.WEBPACK_SERVE ? '[id].css' : '[id].[hash].css',
        })
    ],
    resolve: {
        extensions: [ '.js', '.jsx' ],
        alias: {
            app: path.resolve(__dirname, 'src/app/'),
            assets: path.resolve(__dirname, 'src/assets/')
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        overlay: true
    }
};
