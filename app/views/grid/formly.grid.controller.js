import GridCtrl from './grid.controller';

export default class FormlyGridCtrl extends GridCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService);
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
    vm.options = {
      showAddRemoveRow: vm.catalog.mode === 'edit',
      showNextRow: vm.catalog.mode === 'browse',
      showPaginationRow: true
    };
  }
}
