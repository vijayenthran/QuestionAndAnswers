'use strict';

const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./baseConfig');
module.exports = merge(baseConfig, {
        mode: 'development',
        devServer: {
            contentBase: path.join(__dirname, "../dist"),
            port: 9000,
            historyApiFallback: true,
            publicPath: '/'
        },
        devtool: 'source-map',
});
