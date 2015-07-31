/*jshint browser:true */
'use strict';  
// load Angular
require('angular');
// load the main app file
var appModule = require('../index');  
// replaces ng-app="appName"
angular.element(document).ready(function () {  
  angular.bootstrap(document, [appModule], {
    //strictDi: true
  });
});