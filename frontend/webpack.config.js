const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

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
    ],
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        fallback: {
            zlib: require.resolve('browserify-zlib'),
            querystring: require.resolve('querystring-es3'),
            path: require.resolve('path-browserify'),
        },
    },
};

if (isProduction) {
    module.exports.mode = 'production';
    module.exports.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
} else {
    module.exports.mode = 'development';
}
