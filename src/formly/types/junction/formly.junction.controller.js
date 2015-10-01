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
    vm.fields = vm.$scope.options.data.fields;
    vm.catalog = vm.$scope.options.data.catalog;

    vm.initialize();
    vm.setOptions();
  }

  initialize() {
    var vm = this;
    // Checkboxes
    vm.fields.forEach((colDef, index) => {
      colDef.checkboxSelection = true;
      colDef.cellRenderer = params => params.value.text;
    });
  }

  setOptions() {
    var vm = this;
    vm.options = {
      headerHeight: 0,
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
        let combinedKey =
        row[pKey] = row[pKey] || row[refA] + ' ' + row[refB].value;
      } else {
        // not selected
        delete row[vm.catalog.primaryKey];
      }
    });
  }
}
