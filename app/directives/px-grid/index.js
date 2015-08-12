import angular from 'angular';

import uigrid from 'angular-ui-grid/ui-grid.js';
import 'angular-ui-grid/ui-grid.css';

function pxGrid() {
  return {
    restrict: 'E',
    template: require('./pxgrid.html'),
    scope: {
      options: '=',
      catalog: '=',
      openHandler: '&',
      newHandler: '&',
      deleteHandler: '&',
      paginationChangeHandler: '&',
      rowChangePromise: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function ($scope) {
      var vm = this;

      $scope.$watchGroup(['vm.options.paginationCurrentPage', 'vm.options.paginationPageSize'], (newValues, oldValues) => {
        if(newValues !== oldValues) {
          vm.paginationChangeHandler({
            newPage: newValues[0],
            oldPage: oldValues[0],
            newPageSize: newValues[1],
            oldPageSize: oldValues[1]
          });
        }
      });

      vm.getArray = function(num) {
        return new Array(num);
      };
    }
  };
}

export default angular.module('app.directives.pxgrid', [
    'ui.grid',
    'ui.grid.autoResize',
    'ui.grid.pagination',
    'ui.grid.selection',
    'ui.grid.edit',
    'ui.grid.rowEdit'
  ])
  .directive('pxGrid', pxGrid)
  .name;
