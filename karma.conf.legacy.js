var path = require('path');

var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    reporters: ['progress'],

    files: [
      'app/tests.webpack.js'
    ],

    preprocessors: {
       'app/tests.webpack.js': ['webpack'],
    },

    browsers: ['PhantomJS'],

    // plugins: [
    //   require("karma-webpack"),
    //   require("karma-mocha"),
    //   require("karma-phantomjs-launcher")
    // ],


    webpack: webpackConfig,

    webpackMiddleware: {
        // webpack-dev-middleware configuration
        // i. e.
        noInfo: true
    },



    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
  })
}
