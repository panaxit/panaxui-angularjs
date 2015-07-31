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

    vm.loader();
  }

  openDebugModal() {
    // do not open debug modal for nested views
  }

  loader() {
    var vm = this;
    vm.data = vm.$scope.model[vm.$scope.options.key] || [];
    vm.grid = vm.$scope.options.data.grid;
    vm.catalog = vm.$scope.options.data.catalog;
  }
}

FormlyGridCtrl.$inject = ['$scope', '$stateParams', '$q', 'CRUDService', 'DebugService', 'AlertService'];
