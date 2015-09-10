import GridCtrl from './grid.controller';

export default class FormlyGridCtrl extends GridCtrl {
  constructor($scope, $stateParams, $q, CRUDService, DebugService, AlertService) {
    super($scope, $stateParams, $q, CRUDService, DebugService, AlertService);
    var vm = this;

    vm.$scope = $scope;
    vm.$stateParams = $stateParams;
    vm.$q = $q;
    vm.CRUDService = CRUDService;
    vm.DebugService = DebugService;
    vm.AlertService = AlertService;
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

FormlyGridCtrl.$inject = ['$scope', '$stateParams', '$q', 'CRUDService', 'DebugService', 'AlertService'];
