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
    'ui.grid.pagination',
    'ui.grid.selection',
    'ui.grid.edit',
    'ui.grid.rowEdit',
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

function pxGridCtrl($scope, $document, uiGridConstants) {
  var vm = this;

  /*
  vm function assignments
   */

  vm.getArray = getArray;

  /*
  Sync initialization
   */

  init();

  /*
  Async initialization
   */

  $scope.$watch('vm.options', function(newOptions) {
    if(newOptions) {
      initData(newOptions.data);
      initMetadata(newOptions.metadata);
      initFields(newOptions.fields);
      initOpts(newOptions.opts);
    }
  });

  /*
  function declarations
   */

  function init() {
    // UI Grid
    vm.uiGrid = {};
    // Grid general defaults
    vm.uiGrid.rowHeight = 32;
    vm.uiGrid.showGridFooter = false;
    vm.uiGrid.enableFiltering = true;
    // Pagination defaults
    vm.uiGrid.paginationPageSizes = [5, 10, 25, 50, 100, 500];
    vm.uiGrid.enablePaginationControls = false;
    // On Register API callback
    vm.uiGrid.onRegisterApi = function(gridApi) {
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

  function initData(data) {
    if(!data) return;
    vm.uiGrid.data = data;
  }

  function initMetadata(metadata) {
    if(!metadata) return;
    // External Pagination
    if(metadata.totalItems) {
      vm.uiGrid.useExternalPagination = true;
      vm.uiGrid.totalItems = metadata.totalItems;
      vm.uiGrid.paginationPageSize = metadata.pageSize;
      vm.uiGrid.paginationCurrentPage = metadata.pageIndex;
    }
  }

  function initFields(fields) {
    if(!fields) return;
    // Column Defs
    vm.uiGrid.columnDefs = fields.columnDefs;
    vm.uiGrid.columnDefs.forEach(function (colDef, index) {
      colDef.enableFiltering = false;
      colDef.menuItems = [
        {
          title: 'Toggle Filter',
          icon: 'ui-grid-icon-filter',
          action: function() {
            this.context.col.colDef.enableFiltering = !this.context.col.colDef.enableFiltering;
          }
        }
      ];
    });
  }

  function initOpts(opts) {
    if(!opts) return;
    // Selection
    if(opts.enableRowSelection) {
      vm.uiGrid.enableRowSelection = opts.enableRowSelection;
      vm.uiGrid.enableRowHeaderSelection = opts.enableRowHeaderSelection;
      vm.uiGrid.enableFullRowSelection = opts.enableFullRowSelection;
      vm.uiGrid.multiSelect = opts.multiSelect;
      vm.uiGrid.enableSelectAll = opts.multiSelect;
    }
    // Row edit
    if(opts.enableCellEdit) {
      vm.uiGrid.enableCellEdit = opts.enableCellEdit;
    }
    // Row actions
    if(opts.showRowActionsColumn) {
      vm.uiGrid.columnDefs.push({
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
    }
    // Notify all watchers
    // http://ui-grid.info/docs/#/api/ui.grid.class:Grid#methods_notifydatachange
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
  }

  function getArray(num) {
    return new Array(num);
  }
}
