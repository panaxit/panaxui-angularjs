'use strict';

angular.module('panaxuiApp')
  .config(function config(formlyConfigProvider) {

    formlyConfigProvider.setType({
      name: 'select',
      overwriteOk: true,
      templateUrl: 'scripts/formly/select.html',
      wrapper: ['bootstrapLabel', 'bootstrapHasError']
    });

  });