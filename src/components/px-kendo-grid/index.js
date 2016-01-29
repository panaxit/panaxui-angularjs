/**
 * Dependencies
 */

import angular from 'angular'
import '../../../vendor/kendo.ui/js/kendo.grid.min.js'

/**
 * Resources
 */

import './style.css'
import template from './template.html'

/**
 * Module
 */

export default angular.module('app.components.pxkendogrid', [
  'kendo.directives',
])
.component('pxKendoGrid', {
  bindings: {
    options: '=',
    openHandler: '&',
    newHandler: '&',
    deleteHandler: '&',
    paginationChangeHandler: '&',
    rowSelectionHandler: '&',
    rowChangePromise: '&',
    nextHandler: '&',
  },
  controller: pxKendoGridCtrl,
  controllerAs: 'vm',
  template: template,
})
.name

/**
 * Component's Controller
 */

function pxKendoGridCtrl($scope) {
  var vm = this

  /*
  vm function assignments
   */

  /*
  Sync initialization
   */

  init()

  /*
  Async initialization
   */

  $scope.$watch('vm.options', function(newOptions) {
    if (newOptions) {
      initData(newOptions.data)
      //ToDo: initMetadata(newOptions.metadata)
      initFields(newOptions.fields)
      //ToDo: initOpts(newOptions.opts)
    }
  })

  /*
  function declarations
   */

  function init() {
    // Kendo Grid
    vm.kendoGrid = {}
  }

  function initData(data) {
    if (!data) {
      return
    }
    vm.kendoGrid.dataSource = new kendo.data.DataSource({ // eslint-disable-line no-undef
      data: data,
    })
  }

  function initFields(fields) {
    if (!fields) {
      return
    }
    /*
    Temp Hack
     */
    vm.kendoGrid.columns = fields.map(f => {
      return {
        field: f.field,
        title: f.displayName,
      }
    }, [])
    vm.kendoGrid.columns[vm.kendoGrid.columns.length - 1] = {command: 'edit', title: '&nbsp;', width: '100px'}
  }
}
