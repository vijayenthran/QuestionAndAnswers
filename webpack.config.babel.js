'use strict';
const path = require('path');

module.exports = () => {
    return {
        entry: './src/components/index',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
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
            compress: true,
            port: 9000
        }
    }
};
