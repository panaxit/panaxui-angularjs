'use strict';

/**
 * @ngdoc directive
 * @name panaxuiApp.directive:pxGrid
 * @description
 * # pxGrid
 */
angular.module('panaxuiApp')
  .directive('pxGrid', pxGrid);

function pxGrid() {
  return {
    restrict: 'E',
    templateUrl: 'scripts/directives/px-grid/pxgrid.html',
    scope: {
      catalog: '=',
      data: '=',
      grid: '=',
      loader: '&',
      openHandler: '&',
      newHandler: '&',
      deleteHandler: '&',
      rowChangePromise: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function ($scope) {
      var vm = this;

      vm.gridOptions = {
        paginationPageSizes: [5, 10, 25, 50, 100, 500],
        paginationPageSize: 25,
        rowHeight: 32,
        enablePaginationControls: false,
        showGridFooter: false,
        onRegisterApi: function(gridApi) {
          vm.gridApi = gridApi;
        }
      };

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

      $scope.$watch('vm.grid', function(newGrid) {
        if(newGrid) {
          vm.gridOptions.columnDefs = newGrid;
          vm.gridOptions.columnDefs.push({
            name: 'px-actions',
            displayName: '⚡',
            type: 'object',
            cellTemplate: 'scripts/directives/px-grid/pxgrid.row.actions.html',
            width: '34',
            enableCellEdit: false,
            enableColumnMenus: false,
            enableFiltering: false,
            enableHiding: false,
            enableSorting: false,
          });
        }
      });

      vm.getArray = function(num) {
        return new Array(num);
      };
    }
  };
}
