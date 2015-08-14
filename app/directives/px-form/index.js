import angular from 'angular';

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
      form: '=',
      submitDisabled: '&',
      resetHandler: '&',
      cancelHandler: '&',
      submitHandler: '&',
      paginationChangeHandler: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function ($scope) {
      var vm = this;

      // Default options
      vm.options = {};
      vm.options.paginationPageSizes = [1, 2, 3, 5, 8, 13];

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
