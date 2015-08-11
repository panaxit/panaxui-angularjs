import angular from 'angular';

import formly from 'angular-formly';
import formlyBootstrap from 'angular-formly-templates-bootstrap';
import dirPagination from 'angular-utils-pagination';

function pxForm() {
  return {
    restrict: 'E',
    template: require('./pxform.html'),
    scope: {
      catalog: '=',
      data: '=',
      fields: '=',
      form: '=',
      loader: '&',
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
      vm.options.paginationPageSize = 1;
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

export default angular.module('app.directives.pxform', [
    formly,
    formlyBootstrap,
    dirPagination
  ])
  .directive('pxForm', pxForm)
  .name;
