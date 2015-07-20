'use strict';

angular.module('panaxuiApp')
  .config(function config(formlyConfigProvider) {

    /*
      px-grid (nested)
     */
    formlyConfigProvider.setType({
      name: 'px-grid',
      templateUrl: 'views/grid.html',
      wrapper: ['px-panel', 'bootstrapHasError'],
      controller: 'FormlyGridCtrl as vm'
    });

  });
