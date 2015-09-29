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

  /*
  function declarations
   */

  function initialize() {
    var columnDefs = [
        {headerName: "Make", field: "make"},
        {headerName: "Model", field: "model"},
        {headerName: "Price", field: "price"}
    ];

    var rowData = [
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ];

    vm.gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData
    };
  }

}
