import FormCtrl from '../../../shell/form/form.controller';

export default class FormlyFormCtrl extends FormCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService);
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
      data: vm.$scope.model[vm.$scope.options.key] || []
    };
    if(!angular.isArray(vm.options.data)) { // If single record // ToDo: Fix in Backend
      vm.options.data = [vm.options.data];
    }
    // Other options
    vm.setOpts();
  }

  setOpts() {
    var vm = this;
    vm.options.opts = {
      asyncPagination: false,
      showPaginationRow: true,
      showSaveRow: false,
      showFilterRow: false
    };
  }
}
