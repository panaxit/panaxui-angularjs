'use strict';

/**
 * @ngdoc directive
 * @name panaxuiApp.directive:pxForm
 * @description
 * # pxForm
 */
angular.module('panaxuiApp')
  .directive('pxForm', pxForm);

function pxForm() {
  return {
    restrict: 'E',
    templateUrl: 'scripts/directives/px-form/pxform.html',
    scope: {
      catalog: '=',
      data: '=',
      fields: '=',
      form: '=',
      loader: '&',
      resetHandler: '&',
      cancelHandler: '&',
      submitHandler: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function () {}
  };
}
