const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./libs/parts');
const validate = require('webpack-validator');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    publicPath: '/theLibraryOfBabel/',
    filename: '[name].js'
  }, plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo',
      template: 'index.html',
    })
  ],
  // Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};


var config;
// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common,  { devtool: 'source-map' },
                   parts.setupCSS(PATHS.app),
                   parts.setupBabelReactES6(PATHS.app));
    break;
  default:
    config = merge(common, { devtool: 'eval-source-map' },
                   parts.setupCSS(PATHS.app),
                   parts.setupBabelReactES6(PATHS.app),
                   parts.devServer({
                     // Customize host/port here if needed
                     host: process.env.HOST,
                     port: process.env.PORT
                   })
                  );
}

module.exports = validate(config);
