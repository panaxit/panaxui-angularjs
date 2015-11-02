import BaseCtrl from '../../../shell/base/base.controller';

export default class FormlyJunctionCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService, $q) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService, $q);
  }

  openDebugModal() {
    // do not open debug modal for nested views
  }

  loader() {
    var vm = this;

    vm.data = vm.$scope.model[vm.$scope.options.key] || [];
    vm.catalog = vm.$scope.options.data.catalog;
    vm.initializeFields(vm.$scope.options.data.fields);
    vm.setOptions();
  }

  initializeFields(fields) {
    var vm = this;
    // Checkboxes & Row Grouping
    // http://www.ag-grid.com/example-file-browser/index.php
    var innerCellRenderer = function(params) {
      return params.value.text;
    }
    fields.forEach((colDef, index) => {
      if(index) {
        colDef.cellRenderer = innerCellRenderer;
      } else {
        colDef.cellRenderer = {
          renderer: 'group',
          checkbox: true,
          innerRenderer: innerCellRenderer
        };
      }
    });
    // Set fields
    vm.fields = fields;
  }

  setOptions() {
    var vm = this;
    vm.options = {
      rowSelection: 'multiple',
      isJunctionTable: true
    };
  }

  onRowSelectionChange(selectedRows) {
    let vm = this;
    // Update model
    let pKey = vm.catalog.primaryKey;
    let refA = vm.catalog.foreignReference;
    let refB = pKey.replace(refA, '').replace(',', '');
    angular.forEach(vm.data, (row) => {
      if(selectedRows.indexOf(row) > -1) {
        // Selected
        row[pKey] = row[pKey] || row[refA] + ' ' + row[refB].value;
      } else {
        // not selected
        delete row[vm.catalog.primaryKey];
      }
    });
  }
}
