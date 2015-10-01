/**
 * Dependencies
 */

import angular from 'angular';
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
    'agGrid'
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
      options: '='
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: pxAgGridCtrl
  };
}

/**
 * Directive's Controller
 */
function pxAgGridCtrl($scope) {
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
    vm.gridOptions.api.setRowData(data);
  }

  function initializeFields(fields) {
    // Column Defs
    vm.gridOptions.api.setColumnDefs(fields);
    // Fit Columns
    vm.gridOptions.api.sizeColumnsToFit();
  }

  function initializeOptions(options) {
    // Header
    vm.gridOptions.api.setHeaderHeight(options.headerHeight);
    vm.gridOptions.api.sizeColumnsToFit();
    // Selection
    vm.gridOptions.rowSelection = options.rowSelection;
    // Junction table specifics
    if(options.isJunctionTable) {
      // Select junction rows
      vm.gridOptions.api.forEachNode((node) => {
        let isMulti = (options.rowSelection === 'multiple');
        if(!!node.data[vm.catalog.primaryKey]) {
          vm.gridOptions.api.selectNode(node, isMulti);
        }
        else {
          vm.gridOptions.api.deselectNode(node);
        }
      });
    }
    // Refresh View
    // vm.gridOptions.api.refreshHeader();
    // vm.gridOptions.api.refreshView();
  }

}
