import angular from 'angular';

import dirPagination from 'angular-utils-pagination';

function pxCards() {
  return {
    restrict: 'E',
    template: require('./pxcards.html'),
    scope: {
      mode: '@',
      options: '=',
      data: '=',
      catalog: '=',
      cards: '=',
      openHandler: '&',
      paginationChangeHandler: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function ($scope) {
      var vm = this;

      $scope.$watchGroup(['vm.options.currentPage', 'vm.options.paginationPageSize'], (newValues, oldValues) => {
        if(newValues !== oldValues) {
          vm.paginationChangeHandler({
            newPage: newValues[0],
            oldPage: oldValues[0],
            newPageSize: newValues[1],
            oldPageSize: oldValues[1]
          });
        }
      });
    }
  };
}

export default angular.module('app.directives.pxcards', [
    dirPagination
  ])
  .directive('pxCards', pxCards)
  .name;
