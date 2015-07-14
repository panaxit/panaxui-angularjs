'use strict';

/**
 * @ngdoc directive
 * @name panaxuiApp.directive:pxCards
 * @description
 * # pxCards
 */
angular.module('panaxuiApp')
  .directive('pxCards', pxCards);

function pxCards() {
  return {
    restrict: 'E',
    templateUrl: 'scripts/directives/px-cards/pxcards.html',
    scope: {
      mode: '@',
      model: '=',
      catalog: '=',
      loader: '&',
      openHandler: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function () {
      var vm = this;

      vm.loader();
    }
  };
}
