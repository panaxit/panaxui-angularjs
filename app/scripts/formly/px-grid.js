'use strict';

angular.module('panaxuiApp')
  .config(function config(formlyConfigProvider) {

    /*
      px-grid (nested)
     */
    formlyConfigProvider.setType({
      name: 'px-grid',
      templateUrl: 'scripts/formly/px-grid.html',
      wrapper: ['px-panel', 'bootstrapHasError'],
      controller: 'FormlyGridCtrl as vm'
    });

  });
