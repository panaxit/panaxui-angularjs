/**
 * Dependencies
 */

import angular from 'angular'
import uibootstrap from 'angular-ui-bootstrap'
import Alert from '../../shell/alert'
import 'ag-grid/dist/ag-grid.js'
import 'ag-grid/dist/ag-grid.css'
import 'ag-grid/dist/theme-fresh.css'

/**
 * Resources
 */

import './style.css'
import template from './template.html'

/**
 * Module
 */

export default angular.module('app.directives.px-ag-grid', [
  'agGrid',
  uibootstrap,
  Alert,
])
.directive('pxAgGrid', pxAgGrid)
.name

/**
 * Directive
 */

function pxAgGrid() {
  return {
    restrict: 'E',
    template: template,
    scope: {
      options: '=',
      rowSelectedHandler: '&',
      rowDeselectedHandler: '&',
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: pxAgGridCtrl,
  }
}

/**
 * Directive's Controller
 */

function pxAgGridCtrl($scope, AlertService) {
  var vm = this

  /*
  Sync initialization
   */

  init()

  /*
  Async initialization
   */

  $scope.$watch('vm.options', function(newOptions) {
    if (newOptions) {
      initData(newOptions.data, newOptions.opts)
      initFields(newOptions.fields)
      initOpts(newOptions.opts, newOptions.metadata)
    }
  })

  /*
  function declarations
   */

  function init() {
    // Grid general defaults
    vm.gridOptions = {}
  }

  function initData(data, opts) {
    if (!data) {
      return
    }
      // Row Data
    if (!opts.isJunctionTable) { // Re-Load it later for junction tables
      vm.gridOptions.api.setRowData(data)
    }
  }

  function initFields(fields) {
    if (!fields) {
      return
    }
      // Column Defs
    vm.gridOptions.api.setColumnDefs(fields)
      // Fit Columns
    vm.gridOptions.api.sizeColumnsToFit()
  }

  function initOpts(opts, metadata) {
    if (!opts) {
      return
    }
      // Header
    if (opts.headerHeight) {
      vm.gridOptions.api.setHeaderHeight(opts.headerHeight)
      vm.gridOptions.api.sizeColumnsToFit()
    }
    // Selection
    vm.gridOptions.rowSelection = opts.rowSelection
    vm.gridOptions.suppressRowClickSelection = true
      // Junction table specifics
    if (opts.isJunctionTable) {
      // Set rows grouping & Reload data
      // https://github.com/ceolter/ag-grid/issues/483
      vm.gridOptions.rowsAlreadyGrouped = true
      vm.gridOptions.api.setRowData(vm.options.data)
        // Select junction rows
      vm.gridOptions.api.forEachNode((node) => {
        const isMulti = (opts.rowSelection === 'multiple')
        if (!!node.data[metadata.primaryKey]) {
          vm.gridOptions.api.selectNode(node, isMulti)
        }
        // else {
        //   vm.gridOptions.api.deselectNode(node);
        // }
      })
      // Register API callbacks
      vm.gridOptions.onRowSelected = (event) => {
        // Call rowSelectedHandler
        vm.rowSelectedHandler({
          node: event.node,
        })
      }
      vm.gridOptions.onRowDeselected = (event) => {
        // Call rowSelectedHandler
        vm.rowDeselectedHandler({
          node: event.node,
        })
      }
      vm.gridOptions.onSelectionChanged = (event) => {
        // Check boundaries (minSelections, maxSelections)
        // ToDo:
        //  - https://bitbucket.org/panaxit/panaxui-angularjs/issues/53/angular-formly-junction-type-validate
        //  - https://github.com/ceolter/ag-grid/issues/549
        var numSelected = event.selectedRows.length
        if (opts.minSelections && numSelected < opts.minSelections) {
          AlertService.show('warning', 'Junction Table Validation',
                            'You cannot select less than ' + opts.minSelections + ' records.')
        }
        if (opts.maxSelections && numSelected > opts.maxSelections) {
          AlertService.show('warning', 'Junction Table Validation',
                            'You cannot select more than ' + opts.maxSelections + ' records.')
        }
      }
    }
    // Refresh View
    // vm.gridOptions.api.refreshHeader();
    // vm.gridOptions.api.refreshView();
  }

}
