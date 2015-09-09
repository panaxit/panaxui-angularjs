export default class MasterDetailCtrl {
  constructor($scope, $stateParams, $q, CRUDService, DebugService, AlertService) {
    var vm = this;

    vm.$scope = $scope;
    vm.$stateParams = $stateParams;
    vm.$q = $q;
    vm.CRUDService = CRUDService;
    vm.DebugService = DebugService;
    vm.AlertService = AlertService;

    vm.loader();

    vm.$scope.$on('reloadData', function (event, next) {
      // ToDo: Redraw (re-render) grid. Ex.: when hiding, showing columns
      vm.loader();
    });

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
      controlType: 'masterDetail', // ToDo: Use vm.$stateParams.controlType in all loader's in all controllers
      getData: "1",
      getStructure: "1",
      pageIndex: pageIndex || parseInt(vm.$stateParams.pageIndex) || 1,
      pageSize: pageSize || parseInt(vm.$stateParams.pageSize) || 25
    };
    vm.CRUDService.read(params).then(function (res) {
      vm.catalog = res.data.catalog;
      vm.data = res.data.model || [];
      vm.fields = res.data.fields;
      vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label);
    });
  }
}

MasterDetailCtrl.$inject = ['$scope', '$stateParams', '$q', 'CRUDService', 'DebugService', 'AlertService'];
