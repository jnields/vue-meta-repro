import path from 'path';
import webpackNodeExternals from 'webpack-node-externals';
import { PUBLIC_PATH } from './src/consts';

const getConfig = (server) => ({
  mode: 'production',
  entry: server ? './src/server' : './src/browser',
  output: {
    path: server ? path.resolve('./dist') : path.resolve('./dist/assets'),
    filename: server
      ? 'server.js'
      : 'main.js',
    publicPath: PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /\.js$/,
        include: path.resolve('./src'),
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/env',
              {
                modules: false,
                ...server
                  ? { targets: 'node >= 8' }
                  : { },
              },
            ],
          ],
        },
      },
    ],
  },
  node: server ? false : undefined,
  devtool: '#source-map',
  target: server ? 'node' : 'web',
  externals: server ? [webpackNodeExternals()] : [],
});

export default [
  getConfig(false),
  getConfig(true),
];
