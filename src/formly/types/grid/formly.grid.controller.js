import GridCtrl from '../../../shell/grid/grid.controller';

export default class FormlyGridCtrl extends GridCtrl {
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

    vm.setOptions();
  }

  setOptions() {
    var vm = this;
    // Reuse parent's options
    super.setOptions();
    // Override with vm.options.whatever = ...
  }
}
