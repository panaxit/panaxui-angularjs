// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.
// https://github.com/Foxandxss/angular-webpack-workflow

import 'angular';
import 'angular-mocks/angular-mocks';

var testsContext = require.context(".", true, /.test$/);
testsContext.keys().forEach(testsContext);
