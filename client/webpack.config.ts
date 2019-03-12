import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  entry: { 
    app: ['./src/main.tsx'], 
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader'
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
}