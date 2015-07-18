'use strict';

angular.module('panaxuiApp')
  .config(function config(formlyConfigProvider) {

    formlyConfigProvider.setType({
      name: 'input',
      overwriteOk: true,
      templateUrl: 'scripts/formly/input.html',
      wrapper: ['bootstrapLabel', 'bootstrapHasError']
    });

  });
