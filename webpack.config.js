const webpack = require('webpack');
const path = require('path');
const config = require('./gulp/config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function createConfig(env) {
  let isProduction,
    webpackConfig;

  if (env === undefined) {
    env = process.env.NODE_ENV;
  }

  isProduction = env === 'production';

  webpackConfig = {
    mode: isProduction?'production':'development',
    context: path.join(__dirname, config.src.js),
    entry: {
      // vendor: ['jquery'],
      app: './app.js',
    },
    output: {
      path: path.join(__dirname, config.dest.js),
      filename: '[name].js',
      publicPath: 'js/',
    },
    devtool: isProduction ?
      '#source-map' :
      '#cheap-module-eval-source-map',
    plugins: [
      // new webpack.optimize.CommonsChunkPlugin({
      //     name: 'vendor',
      //     filename: '[name].js',
      //     minChunks: Infinity
      // }),
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            formatter: require('eslint-formatter-pretty'),
            configFile: path.resolve(__dirname, '.eslintrc'),
            cache: false
          }
        }
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
      new webpack.NoEmitOnErrorsPlugin(),

      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        analyzerPort: 4000,
        openAnalyzer: false,
      }),
    ],
    resolve: {
      extensions: ['.js'],
    },
    optimization :{
      minimize: isProduction
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: [
            path.resolve(__dirname, 'node_modules'),
          ],
          loader: 'eslint-loader',
          options: {
            fix: true,
            cache: false,
            ignorePattern: __dirname + '/src/js/lib/'
          }
        }, {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [
            path.resolve(__dirname, 'node_modules'),
          ],
        },
        { test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/ },
        { test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader', exclude: /node_modules/ }
        ],
    },
  };

  if (isProduction) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      })
    );
  }

  return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
