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
import templateViewOptions from './template.view.options.html';

/**
 * Module
 */

export default angular.module('app.directives.pxgrid', [
    'ui.grid',
    //'ui.grid.autoResize',
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

function pxGridCtrl($scope, uiGridConstants) {
  var vm = this;

  /*
  vm function assignments
   */

  vm.toggleFiltering = toggleFiltering;
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
    vm.uiGrid.columnDefs = fields;
    vm.uiGrid.columnDefs.forEach(function (colDef, index) {
      colDef.menuItems = [
        {
          title: 'Toggle Filter',
          icon: 'ui-grid-icon-filter',
          action: function() {
            vm.toggleFiltering();
          }
        }
      ];
    });
  }

  function initOpts(opts) {
    if(!opts) return;
    // Grid general defaults
    vm.uiGrid.rowHeight = 32;
    vm.uiGrid.showGridFooter = false;
    // Pagination defaults
    vm.uiGrid.paginationPageSizes = [5, 10, 25, 50, 100, 500];
    vm.uiGrid.enablePaginationControls = false;
    // Selection
    vm.uiGrid.enableRowSelection = opts.enableRowSelection;
    vm.uiGrid.isRowSelectable = () => { return vm.uiGrid.enableRowSelection; };
    vm.uiGrid.enableRowHeaderSelection = opts.enableRowHeaderSelection;
    vm.uiGrid.enableFullRowSelection = opts.enableFullRowSelection;
    vm.uiGrid.multiSelect = opts.multiSelect;
    // Filtering
    vm.uiGrid.enableFiltering = opts.enableFiltering || false;
    // Row edit
    if(opts.enableCellEdit) {
      vm.uiGrid.enableCellEdit = opts.enableCellEdit;
    }
    // Row actions
    vm.uiGrid.columnDefs.push({
      name: 'px-actions',
      displayName: '⚡',
      type: 'object',
      headerCellTemplate: templateViewOptions,
      cellTemplate: opts.showRowActionsColumn ? templateRowActions : undefined,
      width: '34',
      enableCellEdit: false,
      enableColumnMenus: false,
      enableFiltering: false,
      enableHiding: false,
      enableSorting: false,
    });
    // Notify all watchers
    // http://ui-grid.info/docs/#/api/ui.grid.class:Grid#methods_notifydatachange
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
  }

  function toggleFiltering(){
    vm.uiGrid.enableFiltering = !vm.uiGrid.enableFiltering;
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
  };

  function getArray(num) {
    return new Array(num);
  }
}
