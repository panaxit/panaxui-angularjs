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
      data: '=',
      catalog: '=',
      loader: '&',
      openHandler: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function ($scope) {
      var vm = this;

      vm.loader();

      $scope.$on('reloadData', function (event, next) {
        vm.loader();
      });
    }
  };
}
