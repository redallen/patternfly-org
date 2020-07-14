const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SizePlugin = require('size-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const pfDir = path.dirname(require.resolve('@patternfly/patternfly/package.json'));
// Don't include styles twice
const reactCSSRegex = /(react-[\w-]+\/dist|react-styles\/css)\/.*\.css$/;

module.exports = (_env, argv) => {
  const isDev = argv.mode === 'development'

  return {
    entry: './src/app.js',
    output: {
      path: path.resolve('dist'),
      filename: '[name].[contenthash:8].bundle.js'
    },
    devtool: isDev ? 'cheap-module-source-map' : 'source-map',
    devServer: {
      historyApiFallback: true,
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
    },
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, '../theme-patternfly-org'),
            /react-[\w-]+\/src\/.*\/examples/
          ],
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: '.cache',
              cacheCompression: false,
              ...(isDev && { plugins: [require.resolve('react-refresh/babel')] })
            }
          },
        },
        {
          test: /\.css$/,
          exclude: reactCSSRegex,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
              },
            },
            {
              loader: 'css-loader',
            }
          ]
        },
        {
          test: reactCSSRegex,
          use: 'null-loader'
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            }
          ]
        },
        {
          test: /.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css',
      }),
      new webpack.HashedModuleIdsPlugin(),
      new CopyPlugin({
        patterns: [
          { from: require.resolve('theme-patternfly-org/versions.json'), to: 'versions.json' },
          { from: path.join(pfDir, 'assets/images/'), to: 'assets/images/' },
          { from: path.join(pfDir, 'assets/fonts/'), to: 'assets/fonts/' }
        ]
      }),
      ...(isDev
        ? [
          // new ForkTsCheckerWebpackPlugin({
          //   async: false
          // }),
          new ReactRefreshWebpackPlugin()
        ]
        : [
          new CleanWebpackPlugin(),
          new SizePlugin(),
          new BundleAnalyzerPlugin(),
        ]
      ),
    ],
    optimization: {
      splitChunks: {
        minSize: 1500, // MTU
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 1,
          }
        },
      },
      minimize: isDev ? false : true,
      runtimeChunk: 'single',
    },
    stats: 'minimal',
  };
}
