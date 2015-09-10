import angular from 'angular';

import './pxform.css';

import formly from 'angular-formly';
import formlyBootstrap from 'angular-formly-templates-bootstrap';
import pxPagination from '../../directives/px-pagination';

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
    controller: function ($scope) {
      var vm = this;

      // Default options
      vm.pagination_options = {};
      vm.pagination_options.paginationPageSizes = [1, 2, 3, 5, 8, 13];
      vm.pagination_options.paginationId = 'pagination' + getRandomInt(0, 9999);

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
            vm.pagination_options.paginationPageSize = vm.catalog.pageSize || 1;
            vm.pagination_options.paginationCurrentPage = vm.catalog.pageIndex || 1;
          }
        }
      });

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
    }
  };
}

export default angular.module('app.directives.pxform', [
    formly,
    formlyBootstrap,
    pxPagination
  ])
  .directive('pxForm', pxForm)
  .name;
