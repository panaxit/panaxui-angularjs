'use strict';

angular.module('panaxuiApp')
  .config(function config(formlyConfigProvider) {

    formlyConfigProvider.setType({
      name: 'password',
      extends: 'input',
      defaultOptions: {
        templateOptions: {
          type: 'password'
        }
      }
    });

  });