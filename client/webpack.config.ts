import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as webpack from 'webpack'
import { IWebpackEnvironment } from './src/environments'

export default (env: IWebpackEnvironment) => ({
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
      template: './src/modus.ejs'
    }),
    new webpack.DefinePlugin({
      DEFINE_APP_API: JSON.stringify(env.api),
      DEFINE_APP_WEB_CLIENT: JSON.stringify(env.client)
    })
  ]
})
