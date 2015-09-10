import FormCtrl from './form.controller';

export default class FormlyFormCtrl extends FormCtrl {
  constructor($scope, $stateParams, CRUDService, AlertService, DebugService) {
    super($scope, $stateParams, CRUDService, AlertService, DebugService);
    var vm = this;

    vm.$scope = $scope;
    vm.$stateParams = $stateParams;
    vm.CRUDService = CRUDService;
    vm.AlertService = AlertService;
    vm.DebugService = DebugService;
  }

  openDebugModal() {
    // do not open debug modal for nested views
  }

  loader() {
    var vm = this;

    vm.data = vm.$scope.model[vm.$scope.options.key] || [];
    if(!angular.isArray(vm.data)) { // If single record
      vm.data = [vm.data];
    }
    vm.fields = vm.$scope.options.data.fields;
    vm.catalog = vm.$scope.options.data.catalog;

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

FormlyFormCtrl.$inject = ['$scope', '$stateParams', 'CRUDService', 'AlertService', 'DebugService'];
