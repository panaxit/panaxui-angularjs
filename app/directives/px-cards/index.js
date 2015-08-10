import angular from 'angular';

import dirPagination from 'angular-utils-pagination';

function pxCards() {
  return {
    restrict: 'E',
    template: require('./pxcards.html'),
    scope: {
      mode: '@',
      data: '=',
      catalog: '=',
      cards: '=',
      loader: '&',
      openHandler: '&',
      paginationChangeHandler: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function ($scope) {
      var vm = this;

      // Default options
      vm.options = {};
      vm.options.paginationPageSizes = [4, 8, 16, 32, 64, 128];
      vm.options.paginationPageSize = 8;
      vm.options.currentPage = 1;

      $scope.$watch('vm.catalog', function(newCatalog) {
        if(newCatalog) {
          // External Pagination
          if(newCatalog.totalItems) {
            vm.options.totalItems = newCatalog.totalItems;
          }
        }
      });

      vm.paginationChanged = function(newPage) {
        vm.paginationChangeHandler({newPage: newPage});
      };
    }
  };
}

export default angular.module('app.directives.pxcards', [
    dirPagination
  ])
  .directive('pxCards', pxCards)
  .name;
