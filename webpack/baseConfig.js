'use strict';
const path = require('path');

module.exports = {
        context: path.resolve(__dirname, '../src'), // Point to the src as the context as that has the entry point to start bundling - Needs to be a relative path
        entry: './index.js', // Since the context is mentioned above we just specify our entry file name here. Needs to be an absolute path
        output: {
            path: path.resolve(__dirname, '../dist'), // Where the bundle should be.
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/, // look for any js or jsx file
                    exclude: /node_modules/,
                    use: 'babel-loader' // This would need the .babelrc file
                },
                {
                    test: /\.(s*)css$/, // look for any js or jsx file
                    use: [{loader:'style-loader',options: {
                        insertAt: 'top',
                    }}, 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.(png|jp(e*)g|svg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8000, // Convert images < 8kb to base64 strings
                            name: 'images/[hash]-[name].[ext]'
                        }
                    }]
                }
            ]
        }
};
