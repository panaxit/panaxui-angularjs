'use strict';

angular.module('panaxuiApp')
  .config(function config(formlyConfigProvider) {

    formlyConfigProvider.setType({
      name: 'default',
      extends: 'input',
      templateUrl: 'scripts/formly/default.html'
    });

  });
