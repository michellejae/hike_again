
//Modules
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");



module.exports = {
  // have to change from development to prodcution
    mode: "production",
    // everything from this page is where we will edit code (for front end). it all runs through here
    entry: '/src/app/app.js',

   // the eventual minimized and optimized code that webpack builds
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[id].js',
        clean: true
    },
    // if in production, source-map, unless developemnt eval-source-map
    //devtool: 'source-map',
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
            // CSS and SASS loader
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
      // generates html file into /dist  based off the index.html in src. also adds in the bundle.js and chunk files. 
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        inject: 'body'
      }),
      // generates a css file for every js file that imports css. also does this for sass files cause i have it in loader. puts final css file into html. 
      new MiniCssExtractPlugin({
          filename: 'css/[name].css',
          chunkFilename: '[id].css',
        }),
        // 
      new CopyPlugin({
        patterns: [
          { from: __dirname + '/src/public/img',
            to: path.join(__dirname, 'dist/img')
            },
            { from: __dirname + '/src/public/views',
            to: path.join(__dirname, 'dist/views')
            },
        ],
      }),
    ],

   
  optimization: {
    // need to learn more about these two properties
   runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
         test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',

        },
      },
    },
    minimize: true,
     // i kept getting .txt files when i would do a build, this should take it off. 
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
    // devServer: {
    //     contentBase: './src/public',
    //     watchContentBase: true, 
    //     port: 8080,
    //     proxy: {
    //       '/api' : {
    //         target: 'http://localhost:3000',
    //         secure: false
    //       }
    //     }
    //   },

}


