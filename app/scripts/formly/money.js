'use strict';

angular.module('panaxuiApp')
  .config(function config(formlyConfigProvider) {

    formlyConfigProvider.setType({
      name: 'money',
      extends: 'number',
      templateUrl: 'scripts/formly/money.html'
    });

  });