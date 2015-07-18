'use strict';

angular.module('panaxuiApp')
  .config(function config(formlyConfigProvider) {

    formlyConfigProvider.setType({
      name: 'number',
      extends: 'input',
      defaultOptions: {
        templateOptions: {
          type: 'number'
        }
      }
    });

  });
