const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  let mode = 'development';
  if (process.env.NODE_ENV === 'production') {
    mode = 'production';
  }
  const config = {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /.(js|jsx|ts|tsx?)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
          type: mode === 'production' ? 'asset' : 'asset/resource'
        },
        {
          test: /.s?css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },

    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.ts']
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new Dotenv({
        path: './.env',
        systemvars: true
      })
    ],
    devServer: {
      historyApiFallback: true,
      open: true,
      hot: true,
      port: 3000
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  };

  if (isProduction) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (isProduction) {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    );
  }

  return config;
};
