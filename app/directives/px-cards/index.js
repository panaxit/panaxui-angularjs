import angular from 'angular';

import pxPagination from '../../directives/px-pagination';

function pxCards() {
  return {
    restrict: 'E',
    template: require('./pxcards.html'),
    scope: {
      mode: '@',
      data: '=',
      catalog: '=',
      cards: '=',
      openHandler: '&',
      asyncPagination: '@?',
      paginationChangeHandler: '&?'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function ($scope) {
      var vm = this;

      // Default options
      vm.options = {};
      vm.options.paginationPageSizes = [4, 8, 16, 32, 64, 128];
      vm.options.paginationId = 'pagination' + (Math.floor(Math.random() * (1000 - 1)) + 1);

      $scope.$watch('vm.catalog', function(newCatalog) {
        if(newCatalog) {
          // Pagination
          if(newCatalog.totalItems) {
            // Server-side Pagination
            vm.options.totalItems = newCatalog.totalItems;
            vm.options.paginationPageSize = newCatalog.pageSize;
            vm.options.paginationCurrentPage = newCatalog.pageIndex;
          } else {
            // Client-side Pagination
            vm.options.totalItems = vm.data.length;
            vm.options.paginationPageSize = vm.catalog.pageSize || 8;
            vm.options.paginationCurrentPage = vm.catalog.pageIndex || 1;
          }
        }
      });
    }
  };
}

export default angular.module('app.directives.pxcards', [
    pxPagination
  ])
  .directive('pxCards', pxCards)
  .name;
