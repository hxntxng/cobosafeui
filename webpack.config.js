const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
mode: 'development',
entry: {
    factory: './dist/factory.js',
    ownable: './dist/ownable.js',
    utils: './dist/utils.js',
    factorymain: './dist/factorymain.js',
    dumpmain: './dist/dumpmain.js',
},
    plugins: [
        new HtmlWebpackPlugin({
        title: 'Output Management',
        }),
    ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/',
    // clean: true,
  },
  devServer: {
    historyApiFallback: true,
    // publicPath: "/assets/", // here's the change
    contentBase: path.join(__dirname, 'public'),
  }
};
