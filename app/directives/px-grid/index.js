import angular from 'angular';

import uigrid from 'angular-ui-grid/ui-grid.js';
import 'angular-ui-grid/ui-grid.css';

function pxGrid() {
  return {
    restrict: 'E',
    template: require('./pxgrid.html'),
    scope: {
      catalog: '=',
      data: '=',
      grid: '=',
      loader: '&',
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

      vm.gridOptions = {};
      // Default options
      vm.gridOptions.paginationPageSizes = [5, 10, 25, 50, 100, 500];
      vm.gridOptions.paginationPageSize = 25;
      vm.gridOptions.enablePaginationControls = false;
      vm.gridOptions.rowHeight = 32;
      vm.gridOptions.showGridFooter = false;
      vm.gridOptions.onRegisterApi = function(gridApi) {
        vm.gridApi = gridApi;
      };

      $scope.$watch('vm.grid', function(newGrid) {
        if(newGrid) {
          // Column Defs
          vm.gridOptions.columnDefs = newGrid.columnDefs;
          vm.gridOptions.columnDefs.push({
            name: 'px-actions',
            displayName: '⚡',
            type: 'object',
            cellTemplate: require('./pxgrid.row.actions.html'),
            width: '34',
            enableCellEdit: false,
            enableColumnMenus: false,
            enableFiltering: false,
            enableHiding: false,
            enableSorting: false,
          });
          // External Pagination
          if(newGrid.totalItems) {
            vm.gridOptions.useExternalPagination = true;
            vm.gridOptions.totalItems = newGrid.totalItems;
            vm.gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
              vm.paginationChangeHandler({newPage: newPage, pageSize: pageSize});
            });
          }
        }
      });

      $scope.$watch('vm.catalog', function(newCatalog) {
        if(newCatalog) {
          vm.gridOptions.enableRowSelection = (newCatalog.mode === 'edit');
          vm.gridOptions.enableCellEdit = (newCatalog.mode === 'edit');
          //vm.gridOptions.multiSelect = (newCatalog.mode === 'edit'),
          //vm.gridOptions.enableSelectAll = (newCatalog.mode === 'edit'),
          //vm.gridOptions.selectionRowHeaderWidth = 32,
          if (newCatalog.mode === 'edit') {
            vm.gridApi.rowEdit.on.saveRow($scope, function(rowEntity) {
              vm.gridApi.rowEdit.setSavePromise(rowEntity, vm.rowChangePromise({rowEntity: rowEntity, catalog: newCatalog}));
            });
          }
        }
      });

      $scope.$watch('vm.data', function(newData) {
        if(newData) {
          vm.gridOptions.data = newData;
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
