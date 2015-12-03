/**
 * Dependencies
 */

import angular from 'angular';
import uigrid from 'angular-ui-grid/ui-grid.js';
import 'angular-ui-grid/ui-grid.css';
import coreFilters from '../../core/filters';

/**
 * Resources
 */

import style from './style.css';
import template from './template.html';
import templateRowActions from './template.row.actions.html';

/**
 * Module
 */

export default angular.module('app.directives.pxgrid', [
    'ui.grid',
    'ui.grid.autoResize',
    'ui.grid.selection',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.pagination',
    coreFilters
  ])
  .directive('pxGrid', pxGrid)
  .name;

/**
 * Directive
 */

function pxGrid() {
  return {
    restrict: 'E',
    template: template,
    scope: {
      metadata: '=',
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

/**
 * Directive's Controller
 */

function pxGridCtrl($scope, uiGridConstants) {
  var vm = this;

  /*
  vm function assignments
   */

  vm.getArray = getArray;

  /*
  initialization
   */

  initialize();

  $scope.$watch('vm.data', function(newData) {
    if(newData) initializeData(newData);
  });

  $scope.$watch('vm.fields', function(newFields) {
    if(newFields) initializeFields(newFields);
  });

  $scope.$watch('vm.options', function(newOptions) {
    if(newOptions) initializeOptions(newOptions);
  });

  $scope.$watch('vm.metadata', function(newMetadata) {
    if(newMetadata) initializeMetadata(newMetadata);
  });

  /*
  function declarations
   */

  function initialize() {
    // Grid general defaults
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
      // Row Selection
      vm.gridApi.selection.on.rowSelectionChanged($scope, function(row){
        vm.rowSelectionHandler({row: row});
      });
    };
  }

  function initializeData(data) {
    vm.uigrid_options.data = data;
  }

  function initializeFields(fields) {
    // Column Defs
    vm.uigrid_options.columnDefs = fields.columnDefs;
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
    // Notify all watchers
    // http://ui-grid.info/docs/#/api/ui.grid.class:Grid#methods_notifydatachange
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
  }

  function initializeOptions(options) {
    // Selection
    vm.uigrid_options.enableRowSelection = options.enableRowSelection;
    vm.uigrid_options.enableRowHeaderSelection = options.enableRowHeaderSelection;
    vm.uigrid_options.enableFullRowSelection = options.enableFullRowSelection;
    vm.uigrid_options.multiSelect = options.multiSelect;
    vm.uigrid_options.enableSelectAll = options.multiSelect;
    // Row edit
    vm.uigrid_options.enableCellEdit = options.enableCellEdit;
    // Row actions
    if(options.showRowActionsColumn) {
      vm.uigrid_options.columnDefs.push({
        name: 'px-actions',
        displayName: '⚡',
        type: 'object',
        cellTemplate: templateRowActions,
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
    // Notify changes
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
  }

  function initializeMetadata(metadata) {
    // External Pagination
    if(metadata.totalItems) {
      vm.uigrid_options.useExternalPagination = true;
      vm.uigrid_options.totalItems = metadata.totalItems;
      vm.uigrid_options.paginationPageSize = metadata.pageSize;
      vm.uigrid_options.paginationCurrentPage = metadata.pageIndex;
    }
    // Notify changes
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
  }

  function getArray(num) {
    return new Array(num);
  }
}
