import angular from 'angular';

import './pxcards.css';

import pxPagination from '../../directives/px-pagination';

export default angular.module('app.directives.pxcards', [
    pxPagination
  ])
  .directive('pxCards', pxCards)
  .name;

function pxCards() {
  return {
    restrict: 'E',
    template: require('./pxcards.html'),
    scope: {
      data: '=',
      catalog: '=',
      fields: '=',
      options: '=',
      openHandler: '&',
      nextHandler: '&',
      paginationChangeHandler: '&?'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: pxCardsCtrl
  };
}

function pxCardsCtrl($scope) {
  var vm = this;

  vm.onClick = onClick;

  // Default options
  vm.pagination_options = {};
  vm.pagination_options.paginationPageSizes = [4, 8, 16, 32, 64, 128];
  vm.pagination_options.paginationId = 'pagination' + (Math.floor(Math.random() * (1000 - 1)) + 1);

  vm.selectedRecords = [];

  $scope.$watch('vm.catalog', function(newCatalog) {
    if(newCatalog) {
      // Pagination
      if(newCatalog.totalItems) {
        // Server-side Pagination
        vm.pagination_options.totalItems = newCatalog.totalItems;
        vm.pagination_options.paginationPageSize = newCatalog.pageSize;
        vm.pagination_options.paginationCurrentPage = newCatalog.pageIndex;
      } else {
        // Client-side Pagination
        vm.pagination_options.totalItems = vm.data.length;
        vm.pagination_options.paginationPageSize = vm.catalog.pageSize || 8;
        vm.pagination_options.paginationCurrentPage = vm.catalog.pageIndex || 1;
      }
    }
  });

  function onClick(record) {
    if (['edit', 'readonly'].indexOf(vm.catalog.mode) > -1) {
      vm.openHandler({selected: record});
    } else if (vm.catalog.mode === 'browse') {
      var index = vm.selectedRecords.indexOf(record);
      if(index > -1) {
        vm.selectedRecords.splice(index, 1);
      } else {
        vm.selectedRecords.push(record);
      }
    }
  }
}
