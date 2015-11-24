/**
 * Dependencies
 */

import angular from 'angular';
import uibootstrap from 'angular-ui-bootstrap';
import Alert from '../../shell/alert';
import agGrid from 'ag-grid/dist/ag-grid.js';
import 'ag-grid/dist/ag-grid.css';
import 'ag-grid/dist/theme-fresh.css';

/**
 * Resources
 */

import style from './style.css';
import template from './template.html';

/**
 * Module
 */

export default angular.module('app.directives.px-ag-grid', [
    'agGrid',
    uibootstrap,
    Alert
  ])
  .directive('pxAgGrid', pxAgGrid)
  .name;

/**
 * Directive
 */

function pxAgGrid() {
  return {
    restrict: 'E',
    template: template,
    scope: {
      catalog: '=',
      data: '=',
      fields: '=',
      options: '=',
      rowSelectedHandler: '&',
      rowDeselectedHandler: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: pxAgGridCtrl
  };
}

/**
 * Directive's Controller
 */

function pxAgGridCtrl($scope, AlertService) {
  var vm = this;

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

  /*
  function declarations
   */

  function initialize() {
    // Grid general defaults
    vm.gridOptions = {};
  }

  function initializeData(data) {
    // Row Data
    if(!vm.options.isJunctionTable) { // Re-Load it later for junction tables
      vm.gridOptions.api.setRowData(data);
    }
  }

  function initializeFields(fields) {
    // Column Defs
    vm.gridOptions.api.setColumnDefs(fields);
    // Fit Columns
    vm.gridOptions.api.sizeColumnsToFit();
  }

  function initializeOptions(options) {
    // Header
    if(options.headerHeight) {
      vm.gridOptions.api.setHeaderHeight(options.headerHeight);
      vm.gridOptions.api.sizeColumnsToFit();
    }
    // Selection
    vm.gridOptions.rowSelection = options.rowSelection;
    vm.gridOptions.suppressRowClickSelection = true;
    // Junction table specifics
    if(options.isJunctionTable) {
      // Set rows grouping & Reload data
      // https://github.com/ceolter/ag-grid/issues/483
      vm.gridOptions.rowsAlreadyGrouped = true;
      vm.gridOptions.api.setRowData(vm.data);
      // Select junction rows
      vm.gridOptions.api.forEachNode((node) => {
        let isMulti = (options.rowSelection === 'multiple');
        if(!!node.data[vm.catalog.primaryKey]) {
          vm.gridOptions.api.selectNode(node, isMulti);
        }
        // else {
        //   vm.gridOptions.api.deselectNode(node);
        // }
      });
      // Register API callbacks
      vm.gridOptions.onRowSelected = (event) => {
        // Call rowSelectedHandler
        vm.rowSelectedHandler({node: event.node});
      };
      vm.gridOptions.onRowDeselected = (event) => {
        // Call rowSelectedHandler
        vm.rowDeselectedHandler({node: event.node});
      };
      vm.gridOptions.onSelectionChanged = (event) => {
        // Check boundaries (minSelections, maxSelections)
        // ToDo:
        //  - https://bitbucket.org/panaxit/panaxui-angularjs/issues/53/angular-formly-junction-type-validate
        //  - https://github.com/ceolter/ag-grid/issues/549
        var numSelected = event.selectedRows.length;
        if(options.minSelections && numSelected < options.minSelections) {
          AlertService.show('warning', 'Junction Table Validation', 'You cannot select less than ' + options.minSelections + ' records.');
        }
        if(options.maxSelections && numSelected > options.maxSelections) {
          AlertService.show('warning', 'Junction Table Validation', 'You cannot select more than ' + options.maxSelections + ' records.');
        }
      };
    }
    // Refresh View
    // vm.gridOptions.api.refreshHeader();
    // vm.gridOptions.api.refreshView();
  }

}
