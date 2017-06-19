import { join } from 'path';

const include = join(__dirname, 'src');

export default {
  entry: './src/index.js',
  output: {
    path: join(__dirname, 'assets'),
    libraryTarget: 'umd',
    publicPath: "/assets/",
    library: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', include },
      { test: /\.json$/, loader: 'json-loader', include },
    ],
  },
}
