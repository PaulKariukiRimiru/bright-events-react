var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0', 'stage-2'],
          plugins: ['react-html-attrs', 
          "transform-es2015-modules-commonjs",
          "transform-decorators-legacy",
          "transform-class-properties",
          "transform-decorators",
          "transform-es2015-destructuring", 
          "transform-object-rest-spread"]
        }
      },
      {
        test: /\.css$/,
        use: [
          'handlebars-loader', // handlebars loader expects raw resource string
          'extract-loader',
          'css-loader'
        ]
     },
    {
      test: /\.(png|jp(e*)g|svg)$/,  
      use: [{
          loader: 'url-loader',
          options: { 
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]'
          } 
      }]
    }
    ]
  }
};