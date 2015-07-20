'use strict';

angular.module('panaxuiApp')
  .config(function config(formlyConfigProvider) {

    /*
      panel wrapper
     */
    formlyConfigProvider.setWrapper({
      name: 'px-panel',
      templateUrl: 'scripts/formly/wrappers/px-panel.html'
    });

  });
