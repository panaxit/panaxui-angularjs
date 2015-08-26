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
      openHandler: '&',
      newHandler: '&',
      deleteHandler: '&',
      paginationChangeHandler: '&',
      rowChangePromise: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function ($scope, uiGridConstants) {
      var vm = this;

      // Default options
      vm.options = {};
      vm.options.rowHeight = 32;
      vm.options.showGridFooter = false;
      vm.options.enableFiltering = true;
      // Pagination defaults
      vm.options.paginationPageSizes = [5, 10, 25, 50, 100, 500];
      vm.options.enablePaginationControls = false;
      // On Register API callback
      vm.options.onRegisterApi = function(gridApi) {
        vm.gridApi = gridApi;
        // Row edit
        vm.gridApi.rowEdit.on.saveRow($scope, function(rowEntity) {
          vm.gridApi.rowEdit.setSavePromise(rowEntity, vm.rowChangePromise({rowEntity: rowEntity}));
        });
        // External pagination
        vm.gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
          vm.paginationChangeHandler({newPage: newPage, pageSize: pageSize});
        });
      };

      $scope.$watch('vm.grid', function(newGrid) {
        if(newGrid) {
          // Column Defs
          vm.options.columnDefs = newGrid.columnDefs;
          vm.options.columnDefs.forEach(function (colDef, index) {
            colDef.enableFiltering = false;
            colDef.menuItems = [
              {
                title: 'Toggle Filter',
                icon: 'ui-grid-icon-filter',
                action: function() {
                  this.context.col.colDef.enableFiltering = !this.context.col.colDef.enableFiltering;
                  this.grid.api.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                }
              }
            ];
          });
          vm.options.columnDefs.push({
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
        }
        // Notify all watchers
        // http://ui-grid.info/docs/#/api/ui.grid.class:Grid#methods_notifydatachange
        vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
      });

      $scope.$watch('vm.catalog', function(newCatalog) {
        if(newCatalog) {
          // Selection
          debugger;
          angular.forEach([
            'enableRowSelection',
            'enableRowHeaderSelection',
            'multiSelect',
            'enableSelectAll'
          ], (k) => {
            vm.options[k] = (['edit', 'browse'].indexOf(newCatalog.mode)>-1);
          });
          // Row edit
          vm.options.enableCellEdit = _.includes(newCatalog.mode, 'edit');
          // External Pagination
          if(newCatalog.totalItems) {
            vm.options.useExternalPagination = true;
            vm.options.totalItems = newCatalog.totalItems;
            vm.options.paginationPageSize = newCatalog.pageSize;
            vm.options.paginationCurrentPage = newCatalog.pageIndex;
          }
        }
        // Notify data change
        vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
      });

      $scope.$watch('vm.data', function(newData) {
        if(newData) {
          vm.options.data = newData;
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
    'ui.grid.selection',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.pagination'
  ])
  .directive('pxGrid', pxGrid)
  .name;
