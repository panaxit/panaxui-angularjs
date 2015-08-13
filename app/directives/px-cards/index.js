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

      $scope.$watch('vm.catalog', function(newCatalog) {
        if(newCatalog) {
          // External Pagination
          if(newCatalog.totalItems) {
            vm.options.totalItems = newCatalog.totalItems;
            vm.options.paginationPageSize = newCatalog.pageSize;
            vm.options.currentPage = newCatalog.pageIndex;
          }
        }
      });

      vm.getTotalPages = function() {
        if (!vm.catalog.totalItems) { // (!vm.options.enablePagination) {
          return null;
        }
        return (vm.options.totalItems === 0) ? 1 : Math.ceil(vm.options.totalItems / vm.options.paginationPageSize);
      };

      $scope.$watch('vm.options.currentPage + vm.options.paginationPageSize', (newValues, oldValues) => {
        if (newValues === oldValues || oldValues === undefined) {
          return;
        }
        if (!angular.isNumber(vm.options.currentPage) || vm.options.currentPage < 1) {
          vm.options.currentPage = 1;
          return;
        }
        if (vm.options.totalItems > 0 && vm.options.currentPage > vm.getTotalPages()) {
          vm.options.currentPage = vm.getTotalPages();
          return;
        }

        vm.paginationChangeHandler({
          newPage: vm.options.currentPage,
          newPageSize: vm.options.paginationPageSize
        });
      });
    }
  };
}

export default angular.module('app.directives.pxcards', [
    dirPagination
  ])
  .directive('pxCards', pxCards)
  .name;
