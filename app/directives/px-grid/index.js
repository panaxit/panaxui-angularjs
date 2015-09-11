import angular from 'angular';

import './pxgrid.css';

import uigrid from 'angular-ui-grid/ui-grid.js';
import 'angular-ui-grid/ui-grid.css';

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

function pxGrid() {
  return {
    restrict: 'E',
    template: require('./pxgrid.html'),
    scope: {
      catalog: '=',
      data: '=',
      fields: '=',
      options: '=',
      openHandler: '&',
      newHandler: '&',
      deleteHandler: '&',
      paginationChangeHandler: '&',
      rowSelectionHandler: '&',
      rowChangePromise: '&',
      nextHandler: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: pxGridCtrl
  };
}

function pxGridCtrl($scope, uiGridConstants) {
  var vm = this;

  vm.getArray = getArray;

  // Default options
  vm.uigrid_options = {};
  vm.uigrid_options.rowHeight = 32;
  vm.uigrid_options.showGridFooter = false;
  vm.uigrid_options.enableFiltering = true;
  // Pagination defaults
  vm.uigrid_options.paginationPageSizes = [5, 10, 25, 50, 100, 500];
  vm.uigrid_options.enablePaginationControls = false;
  // On Register API callback
  vm.uigrid_options.onRegisterApi = function(gridApi) {
    vm.gridApi = gridApi;
    // Row edit
    vm.gridApi.rowEdit.on.saveRow($scope, function(rowEntity) {
      vm.gridApi.rowEdit.setSavePromise(rowEntity, vm.rowChangePromise({rowEntity: rowEntity}));
    });
    // External pagination
    vm.gridApi.pagination.on.paginationChanged($scope, function(newPage, pageSize) {
      vm.paginationChangeHandler({newPage: newPage, pageSize: pageSize});
    });
    vm.gridApi.selection.on.rowSelectionChanged($scope, function(row){
      if(row.isSelected) {
        vm.rowSelectionHandler({row: row.entity});
      }
    });
  };

  $scope.$watch('vm.fields', function(newGrid) {
    if(newGrid) {
      // Column Defs
      vm.uigrid_options.columnDefs = newGrid.columnDefs;
      vm.uigrid_options.columnDefs.forEach(function (colDef, index) {
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
    }
    // Notify all watchers
    // http://ui-grid.info/docs/#/api/ui.grid.class:Grid#methods_notifydatachange
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
  });

  $scope.$watch('vm.options', function(newOptions) {
    if(newOptions) {
      // Selection
      vm.uigrid_options.enableRowSelection = newOptions.enableRowSelection;
      vm.uigrid_options.enableRowHeaderSelection = newOptions.enableRowHeaderSelection;
      vm.uigrid_options.enableFullRowSelection = newOptions.enableFullRowSelection;
      vm.uigrid_options.multiSelect = newOptions.multiSelect;
      vm.uigrid_options.enableSelectAll = newOptions.multiSelect;
      // Row edit
      vm.uigrid_options.enableCellEdit = newOptions.enableCellEdit;
      // Row actions
      if(newOptions.showRowActionsColumn) {
        vm.uigrid_options.columnDefs.push({
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
        // Notify column change
        vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      }
    }
    // Notify changes
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
  });

  $scope.$watch('vm.catalog', function(newCatalog) {
    if(newCatalog) {
      // External Pagination
      if(newCatalog.totalItems) {
        vm.uigrid_options.useExternalPagination = true;
        vm.uigrid_options.totalItems = newCatalog.totalItems;
        vm.uigrid_options.paginationPageSize = newCatalog.pageSize;
        vm.uigrid_options.paginationCurrentPage = newCatalog.pageIndex;
      }
    }
    // Notify changes
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
  });

  $scope.$watch('vm.data', function(newData) {
    if(newData) {
      vm.uigrid_options.data = newData;
    }
  });

  function getArray(num) {
    return new Array(num);
  }
}
