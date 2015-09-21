import angular from 'angular';
import dirPagination from 'angular-utils-pagination';

import './pxpagination.css';

export default angular.module('app.directives.pxpagination', [
    dirPagination
  ])
  .directive('pxPagination', pxPagination)
  .name;

function pxPagination() {
  return {
    restrict: 'E',
    template: require('./pxpagination.html'),
    scope: {
      pagination_options: '=options',
      onPaginationChange: '&?'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: pxPaginationCtrl
  };
}

function pxPaginationCtrl($scope) {
  var vm = this;

  vm.getTotalPages = getTotalPages;

  $scope.$watch('vm.pagination_options.paginationCurrentPage + vm.pagination_options.paginationPageSize', (newValues, oldValues) => {
    if (newValues === oldValues || oldValues === undefined) {
      return;
    }
    if (!angular.isNumber(vm.pagination_options.paginationCurrentPage) || vm.pagination_options.paginationCurrentPage < 1) {
      vm.pagination_options.paginationCurrentPage = 1;
      return;
    }
    if (vm.pagination_options.totalItems > 0 && vm.pagination_options.paginationCurrentPage > vm.getTotalPages()) {
      vm.pagination_options.paginationCurrentPage = vm.getTotalPages();
      return;
    }

    vm.onPaginationChange({
      newPage: vm.pagination_options.paginationCurrentPage,
      newPageSize: vm.pagination_options.paginationPageSize
    });
  });

  function getTotalPages() {
    if (!vm.pagination_options.totalItems) { // (!vm.pagination_options.enablePagination) {
      return null;
    }
    return (vm.pagination_options.totalItems === 0) ? 1 : Math.ceil(vm.pagination_options.totalItems / vm.pagination_options.paginationPageSize);
  }
}
