import angular from 'angular';

import dirPagination from 'angular-utils-pagination';

function pxPagination() {
  return {
    restrict: 'E',
    template: require('./pxpagination.html'),
    scope: {
      options: '=',
      onPaginationChange: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function ($scope) {
      var vm = this;

      vm.getTotalPages = function() {
        if (!vm.options.totalItems) { // (!vm.options.enablePagination) {
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

        vm.onPaginationChange({
          newPage: vm.options.currentPage,
          newPageSize: vm.options.paginationPageSize
        });
      });
    }
  };
}

export default angular.module('app.directives.pxpagination', [
    dirPagination
  ])
  .directive('pxPagination', pxPagination)
  .name;
