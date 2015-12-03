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

    vm.metadata = vm.$scope.options.data.metadata;
    vm.fields = vm.$scope.options.data.fields;
    vm.data = vm.$scope.model[vm.$scope.options.key] || [];
    if(!angular.isArray(vm.data)) { // If single record
      vm.data = [vm.data];
    }

    vm.setOptions();
  }

  setOptions() {
    var vm = this;
    vm.options = {
      asyncPagination: false,
      showPaginationRow: true
    };
  }
}
