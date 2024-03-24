// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const isProduction = false;


const config = {
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
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
        
    } else {
        config.mode = 'development';
    }
    return config;
};

module.exports={
    resolve: {
    fallback: {
      zlib: require.resolve('browserify-zlib')
    }
  }
}
module.exports={
    resolve: {
    fallback: {
      querystring: require.resolve('querystring-es3')
    }
  }
}
module.exports={
    resolve: {
    fallback: {
      path: require.resolve('path-browserify')
    }
  }
}
module.exports = {
  // Other configuration options...

  resolve: {
    fallback: {
      crypto: false
    }
  }
};
module.exports = {
  // Other configuration options...

  resolve: {
    fallback: {
      stream: false
    }
  }
};
