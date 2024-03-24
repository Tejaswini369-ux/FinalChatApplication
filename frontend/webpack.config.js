const path = require('path');

module.exports = {
  entry: './src/index.js', // Update the entry point according to your project structure
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      // Add any other loaders or rules as needed
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Add '.jsx' to resolve JSX files without explicitly specifying the extension
  },
};
