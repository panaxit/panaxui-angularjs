'use strict';

angular.module('panaxuiApp')
  .config(function config(formlyConfigProvider) {

    /*
      px-form (nested)
     */
    formlyConfigProvider.setType({
      name: 'px-form',
      //templateUrl: 'views/form.html',
      templateUrl: 'scripts/formly/px-form.html',
      wrapper: ['px-panel', 'bootstrapHasError'],
      controller: 'FormlyFormCtrl as vm'
    });

  });
