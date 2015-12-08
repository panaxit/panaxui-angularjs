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
    // First-class options
    vm.options = {
      metadata: vm.$scope.options.data.metadata,
      fields: vm.$scope.options.data.fields,
      data: vm.$scope.model[vm.$scope.options.key]
    };
    // Other options
    vm.setOpts();
  }

  setOpts() {
    var vm = this;
    // Reuse parent's options
    super.setOpts();
    // Override with vm.options.whatever = ...
  }
}
