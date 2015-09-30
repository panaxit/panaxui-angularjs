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

  /*
  function declarations
   */

  function initialize() {
    vm.gridOptions = {};
    // ToDo: Exclusive to junction table
    vm.gridOptions.headerHeight = 0;
    vm.gridOptions.rowSelection = 'multiple';
  }

  function initializeData(data) {
    // Row Data
    vm.gridOptions.api.setRowData(data);
  }

  function initializeFields(fields) {
    // Column Defs
    fields.forEach(function(colDef, index) {
      colDef.checkboxSelection = true;
    });
    vm.gridOptions.api.setColumnDefs(fields);
    vm.gridOptions.api.sizeColumnsToFit();
  }

}
