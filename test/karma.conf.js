// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-02-11 using
// generator-karma 0.9.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-bootstrap-nav-tree-nif/dist/abn_tree_directive.js',
      'bower_components/angular-ui-grid/ui-grid.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-urlify/angular-urlify-filter.js',
      'bower_components/angular-md5/angular-md5.js',
      'bower_components/tv4/tv4.js',
      'bower_components/objectpath/lib/ObjectPath.js',
      'bower_components/spectrum/spectrum.js',
      'bower_components/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.min.js',
      'bower_components/angular-schema-form/dist/schema-form.js',
      'bower_components/angular-schema-form/dist/bootstrap-decorator.js',
      'bower_components/angular-ui-select/dist/select.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/underscore/underscore.js',
      'bower_components/angular-schema-form-ui-select/ui-sortable.js',
      'bower_components/angular-schema-form-ui-select/angular-underscore.js',
      'bower_components/angular-schema-form-ui-select/bootstrap-ui-select.min.js',
      'bower_components/pickadate/lib/picker.js',
      'bower_components/pickadate/lib/picker.date.js',
      'bower_components/pickadate/lib/picker.time.js',
      'bower_components/angular-schema-form-datepicker/bootstrap-datepicker.min.js',
      'bower_components/angular-schema-form-colorpicker/bootstrap-colorpicker.min.js',
      'bower_components/rainbow/js/rainbow.min.js',
      'bower_components/rainbow/js/language/javascript.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 9999,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
