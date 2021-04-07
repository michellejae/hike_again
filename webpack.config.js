
//Modules
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const TerserPlugin = require("terser-webpack-plugin");
// 
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");



const isDev = process.env.NODE_ENV === 'development'


module.exports = {
  // have to change from development to prodcution
    mode: isDev ? 'development' : 'production',
    // everything from this page is where we will edit code (for front end). it all runs through here
    entry: './src/app/app.js',

   // the eventual minimized and optimized code that webpack builds
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
      //  chunkFilename: '[name].[contenthash].js' 
    },
    // if in production, source-map, unless developemnt
    // for some reason isProd is false evem though ENV == build 
    // so i am sitting the below for source-map to be the falsy value
    devtool: 'eval-source-map',

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
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', ],
            },
            // ASSET loader
            {
                test: /\.(png|svg|jpg|jpeg|gif|svg|woff|woff2|ttf|eo)$/i,
                type: 'asset/resource',
            },
            // HTML loader
            {
                test: /\.html$/i,
                loader: 'html-loader',
            }

        ]
    },

    plugins: [
      // generates a css file for every js file that imports css
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
          }),

        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body'}),

        // new CopyPlugin({
        //   patterns: [
        //     { from: __dirname + '/src/public',
        //       to: './public/index.html',
        //       toType: "template"}
        //   ],
        // })
    ],

    // i kept getting .txt files when i would do a build, this should take it off. 
  optimization: {
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

    // uncomment from time to time to see if duplicate dependencies are actually being bundled
    // optimization: {

    //     splitChunks: {
    //       chunks: 'all',
    //     },
    //   },
    // will need to set proxy to backend
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

