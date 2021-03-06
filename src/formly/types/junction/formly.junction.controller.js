import BaseCtrl from '../../../shell/base/base.controller'

export default class FormlyJunctionCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService, $q) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService, $q)
  }

  openDebugModal() {
    // do not open debug modal for nested views
  }

  loader() {
    var vm = this
    // Main `options' object
    // to be consumed by directive(s)
    vm.options = {
      data: vm.$scope.model[vm.$scope.options.key] || [],
      metadata: vm.$scope.options.data.metadata,
      fields: vm.initializeFields(vm.$scope.options.data.fields),
      opts: vm.getOpts(),
    }
  }

  initializeFields(fields) {
    // Checkboxes & Row Grouping
    // http://www.ag-grid.com/example-file-browser/index.php
    var innerCellRenderer = function(params) {
      return params.value.text
    }
    fields.forEach((colDef, index) => {
      if (index) {
        colDef.cellRenderer = innerCellRenderer
      } else {
        colDef.cellRenderer = {
          renderer: 'group',
          checkbox: true,
          innerRenderer: innerCellRenderer,
        }
      }
    })
    // Return fields
    return fields
  }

  getOpts() {
    var vm = this
    return {
      rowSelection: 'multiple',
      isJunctionTable: true,
      minSelections: vm.$scope.to.minSelections,
      maxSelections: vm.$scope.to.maxSelections,
    }
  }

  onRowSelected(node) {
    const vm = this
    // Update model
    const pKey = vm.options.metadata.primaryKey
    const refA = vm.options.metadata.foreignReference
    const refB = pKey.replace(refA, '').replace(',', '')
    // Add pKey value
    node.data[pKey] = node.data[pKey] || node.data[refA] + ' ' + node.data[refB].value
  }

  onRowDeselected(node) {
    const vm = this
    // Update model
    // Remove pKey value
    delete node.data[vm.options.metadata.primaryKey]
  }
}
