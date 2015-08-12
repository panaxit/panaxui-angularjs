import angular from 'angular';

import formly from 'angular-formly';
import formlyBootstrap from 'angular-formly-templates-bootstrap';
import dirPagination from 'angular-utils-pagination';

function pxForm() {
  return {
    restrict: 'E',
    template: require('./pxform.html'),
    scope: {
      options: '=',
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

      $scope.$watchGroup(['vm.options.currentPage', 'vm.options.paginationPageSize'], (newValues, oldValues) => {
        if(newValues !== oldValues) {
          vm.paginationChangeHandler({
            newPage: newValues[0],
            oldPage: oldValues[0],
            newPageSize: newValues[1],
            oldPageSize: oldValues[1]
          });
        }
      });
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
