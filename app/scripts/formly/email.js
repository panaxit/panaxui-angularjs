'use strict';

angular.module('panaxuiApp')
  .config(function config(formlyConfigProvider) {

    formlyConfigProvider.setType({
      name: 'email',
      extends: 'input',
      defaultOptions: {
        templateOptions: {
          type: 'email'
        }
      }
    });

  });