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
    vm.fields.forEach(function(colDef, index) {
      colDef.checkboxSelection = true;
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
    var vm = this;
    // vm.data.indexOf()
    // debugger;
  }
}
