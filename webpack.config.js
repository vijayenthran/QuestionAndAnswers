'use strict';
const path = require('path');

module.exports = () => {
    return {
        mode: 'development',
        context : path.resolve(__dirname, 'src'), // Point to the src as the context as that has the entry point to start bundling - Needs to be a relative path
        entry: './index.js', // Since the context is mentioned above we just specify our entry file name here. Needs to be an absolute path
        output: {
            path: path.resolve(__dirname, 'dist'), // Where the bundle should be.
            filename: 'bundle.js',
            // publicPath: path.join(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/, // look for any js or jsx file
                    exclude: /node_modules/,
                    use: 'babel-loader' // This would need the .babelrc file
                },
                {
                    test: /\.css$/, // look for any js or jsx file
                    use: [ 'style-loader', 'css-loader' ]
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            port: 9000,
            historyApiFallback: true
        },
        devtool : 'source-map',
    };
};
