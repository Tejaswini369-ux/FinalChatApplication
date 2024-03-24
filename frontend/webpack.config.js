const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const isProduction = true;

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                loader: 'babel-loader',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        fallback: {
            zlib: require.resolve('browserify-zlib'),
            querystring: require.resolve('querystring-es3'),
            path: require.resolve('path-browserify'),
            crypto: false,
            stream: false,
        },
    },
};

if (isProduction) {
    module.exports.mode = 'production';
    module.exports.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
} else {
    module.exports.mode = 'development';
}
