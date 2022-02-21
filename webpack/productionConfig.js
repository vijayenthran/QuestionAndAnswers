'use strict';

const merge = require('webpack-merge');
const baseConfig = require('./baseConfig');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(baseConfig, {
    mode:'production',
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                sourceMap: false,
                compress: true,
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ]
});
