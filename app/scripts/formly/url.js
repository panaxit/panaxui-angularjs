'use strict';

angular.module('panaxuiApp')
  .config(function config(formlyConfigProvider) {

    formlyConfigProvider.setType({
      name: 'url',
      extends: 'input',
      defaultOptions: {
        templateOptions: {
          type: 'url'
        }
      }
    });

  });