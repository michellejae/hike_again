
//Modules
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");



module.exports = {
  // have to change from development to prodcution
    mode: "development",
    // everything from this page is where we will edit code (for front end). it all runs through here
    entry: '/src/app/app.js',

   // the eventual minimized and optimized code that webpack builds
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].js'
    },
    // if in production, source-map, unless developemnt
    // for some reason isProd is false evem though ENV == build 
    // so i am sitting the below for source-map to be the falsy value
   // devtool: 'source-map',
    module: {
        rules: [
            // BABEL/ JS loader
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              },
            // CSS loader
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ],
            },
            // ASSET loader
            {
                test: /\.(png|svg|jpg|jpeg|gif|svg|woff|woff2|ttf|eo)$/i,
                type: 'asset/resource',
            },
            // HTML loader
            {
                test: /\.html$/,
                loader: 'html-loader',
            }

        ]
    },

    plugins: [

      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        inject: 'body'
      }),
      // generates a css file for every js file that imports css
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
          }),
          // new CopyPlugin({
         
          //   patterns: [
          //     { from: __dirname + '/src/public',
          //       to: './'
          //       }
          //   ],
          // }),
    ],

    // i kept getting .txt files when i would do a build, this should take it off. 
  optimization: {
    // runtimeChunk: 'single',
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //      test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all',

    //     },
    //   },
    // },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
    devServer: {
        contentBase: './src/public',
        watchContentBase: true, 
        port: 8080,
        proxy: {
          '/api' : {
            target: 'http://localhost:3000',
            secure: false
          }
        }
      },

}


