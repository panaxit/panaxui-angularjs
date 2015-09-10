export default class MasterDetailCtrl {
  constructor($scope, $stateParams, CRUDService, AlertService, DebugService) {
    var vm = this;

    vm.$scope = $scope;
    vm.$stateParams = $stateParams;
    vm.CRUDService = CRUDService;
    vm.AlertService = AlertService;
    vm.DebugService = DebugService;

    vm.loader();

    vm.$scope.$on('reloadData', function (event, next) {
      vm.loader();
    });

    // open Debug Modal and resolve `form-specific` objects
    vm.$scope.$on('openDebugModal', (event, next) => { vm.openDebugModal(); });
  }

  openDebugModal() {
    var vm = this;
    vm.DebugService.show({
      catalog: vm.catalog,
      fields: vm.fields,
      model: vm.data
    });
  }

  loader(pageIndex, pageSize) {
    var vm = this;
    var params = {
      mode: vm.$stateParams.mode,
      catalogName: vm.$stateParams.catalogName,
      filters: vm.$stateParams.filters || '',
      controlType: 'masterDetail',
      getData: '1',
      getStructure: '1',
      pageIndex: pageIndex || parseInt(vm.$stateParams.pageIndex) || 1,
      pageSize: pageSize || parseInt(vm.$stateParams.pageSize) || 25
    };
    if(vm.$stateParams.id) {
      // Fallback options
      var idKey = vm.$stateParams.identityKey ||
                  vm.$stateParams.primaryKey ||
                  '$identity' || // Supported in SQL Server only for tables
                  'id';       // Last resort
      params.filters += '[' + idKey + '=' + vm.$stateParams.id + ']';
    }
    vm.CRUDService.read(params).then(function (res) {
      vm.catalog = res.data.catalog;
      vm.data = res.data.model || [];
      vm.fields = {
        grid: res.data.fields.grid,
        form: res.data.fields.form
      };
      vm.setOptions();
      vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label);
    });
  }

  setOptions() {
    var vm = this;
    vm.options = {
      // Grid
      showAddRemoveRow: false,
      showNextRow: false,
      // Form
      asyncPagination: true,
      // Both
      showPaginationRow: true
    };
  }
}

MasterDetailCtrl.$inject = ['$scope', '$stateParams', 'CRUDService', 'AlertService', 'DebugService'];
