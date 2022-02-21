'use strict';

const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./baseConfig');
const webpack = require('webpack');

const Mode = 'development';

module.exports = merge(baseConfig, {
        mode: Mode,
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(Mode)
            }),
        ],
        devServer: {
            client: {
                progress: true,
            },
            allowedHosts: 'auto',
            static: {
                directory: path.join(__dirname, "../dist"),
                publicPath: '/',
                watch: true
            },
            port: 9000,
            historyApiFallback: true,
        },
        devtool: 'source-map',
});
