export default class CardsCtrl {
  constructor($scope, $stateParams, CRUDService, DebugService) {
    var vm = this;

    vm.$scope = $scope;
    vm.$stateParams = $stateParams;
    vm.CRUDService = CRUDService;
    vm.DebugService = DebugService;

    vm.mode = $stateParams.mode;

    vm.loader();

    vm.$scope.$on('reloadData', function (event, next) {
      vm.loader();
    });

    vm.$scope.$on('openDebugModal', (event, next) => { vm.openDebugModal(); });
  }

  openDebugModal() {
    var vm = this;
    vm.DebugService.show({
      catalog: vm.catalog,
      model: vm.data
    });
  }

  loader() {
    var vm = this;

    vm.CRUDService.read({
      mode: 'readonly', //$stateParams.mode, // Is always readonly to get all records
      catalogName: vm.$stateParams.catalogName,
      filters: vm.$stateParams.filters || '',
      controlType: 'cardView',
      getData: "1",
      getStructure: "1"
    }).then(function (res) {
      vm.catalog = res.data.catalog || {};
      vm.data = res.data.model || [];
      vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label);
    });
  }

  onOpen(selected) {
    var vm = this;
    var identifier = selected[vm.catalog.primaryKey] ||
             selected[vm.catalog.identityKey];

    vm.$scope.$emit('goToState', 'main.panel.form', {
      catalogName: vm.catalog.catalogName,
      mode: vm.mode,
      id: identifier
    });
  }
}

CardsCtrl.$inject = ['$scope', '$stateParams', 'CRUDService', 'DebugService'];
