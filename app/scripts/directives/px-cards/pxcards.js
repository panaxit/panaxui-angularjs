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
      mode: '=',
      model: '=',
      catalog: '='
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function ($scope) {
      var vm = this;
      // View/Edit handler
      vm.onOpen =  function(selected) {
        var identifier = selected[vm.catalog.primaryKey] ||
                 selected[vm.catalog.identityKey];

        $scope.$emit('goToState', 'main.panel.form.view', {
          catalogName: vm.catalog.catalogName,
          mode: vm.mode,
          id: identifier
        });
      };
    }
  };
}
