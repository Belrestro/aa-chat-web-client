const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'bundle.js'
  },
  watchOptions: {
    aggregateTimeout: 100,
    poll: 1000
  },
  resolve: {
    extensions: ['.js', 'jsx', 'scss', '.css'],        
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development')
        }
    })
]
}
