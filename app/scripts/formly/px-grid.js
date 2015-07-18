'use strict';

angular.module('panaxuiApp')
  .config(function config(formlyConfigProvider) {

    /*
      px-grid (nested)
     */
    formlyConfigProvider.setType({
      name: 'px-grid',
      //templateUrl: 'scripts/formly/ui-grid.html',
      templateUrl: 'views/grid.html',
      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
      controller: 'FormlyGridCtrl as vm'
    });

  });