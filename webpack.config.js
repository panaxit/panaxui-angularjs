'use strict';

var webpack = require('webpack');
var path = require('path');

var APP = path.join(__dirname, '/app');

module.exports = {
	context: APP,
	entry: {
		app: "./core/bootstrap.js"
	},
	output: {
		path: path.join(APP, '/dist'),
		filename: "bundle.js"
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'ng-annotate!babel!jshint', //!eslint',
			exclude: /node_modules|bower_components/
		}, {
			test: /\.html/,
			loader: 'raw'
		}, {
			test: /\.css$/,
			loader: "style!css"
		}, {
			test: /\.scss$/,
			loader: 'style!css!sass'
    },{
      test: "\.jpg$",
      loader: "file-loader"
		},{
			test: /\.(png|woff|woff2|eot|ttf|svg)$/,
			loader: 'url-loader?limit=100000'
    }, {
      // https://github.com/webpack/css-loader/issues/18
      test: /\.ttf\?$/,
      loader: 'file-loader'
		}]
	},
  // resolve: {
  //   //http://webpack.github.io/docs/configuration.html#resolve-alias
  //   alias: {
  //     "angular-ui-grid": __dirname + "/node_modules/angular-ui-grid"
  //   }
  // },
  // https://github.com/webpack/webpack/issues/111#issuecomment-26786614
  resolveLoader: {
    fallback: __dirname + "/node_modules"
  }
	// http://webpack.github.io/docs/usage-with-bower.html
	// resolve: {
	// 	root: [path.join(__dirname, "bower_components")]
	// },
	// plugins: [
	// 	new webpack.ResolverPlugin(
	// 		new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
	// 	)
	// ]
};
