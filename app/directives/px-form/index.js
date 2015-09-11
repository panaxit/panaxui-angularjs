import angular from 'angular';

import './pxform.css';

import formly from 'angular-formly';
import formlyBootstrap from 'angular-formly-templates-bootstrap';
import pxPagination from '../../directives/px-pagination';

export default angular.module('app.directives.pxform', [
    formly,
    formlyBootstrap,
    pxPagination
  ])
  .directive('pxForm', pxForm)
  .name;

function pxForm() {
  return {
    restrict: 'E',
    template: require('./pxform.html'),
    scope: {
      catalog: '=',
      data: '=',
      fields: '=',
      options: '=',
      form: '=?',
      paginationChangeHandler: '&?'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: pxFormCtrl
  };
}

function pxFormCtrl($scope) {
  var vm = this;

  /*
  initialization
   */

  initialize();

  $scope.$watch('vm.catalog', function(newCatalog) {
    if(newCatalog) initializeCatalog(newCatalog);
  });

  /*
  function declarations
   */

  function initialize() {
    // Default options
    vm.pagination_options = {};
    vm.pagination_options.paginationPageSizes = [1, 2, 3, 5, 8, 13];
    vm.pagination_options.paginationId = 'pagination' + getRandomInt(0, 9999);
  }

  function initializeCatalog(catalog) {
    // Pagination
    if(catalog.totalItems) {
      // Server-side Pagination
      vm.pagination_options.totalItems = catalog.totalItems;
      vm.pagination_options.paginationPageSize = catalog.pageSize;
      vm.pagination_options.paginationCurrentPage = catalog.pageIndex;
    } else {
      // Client-side Pagination
      vm.pagination_options.totalItems = vm.data.length;
      vm.pagination_options.paginationPageSize = vm.catalog.pageSize || 1;
      vm.pagination_options.paginationCurrentPage = vm.catalog.pageIndex || 1;
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
