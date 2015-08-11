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
      cards: vm.cards,
      model: vm.data
    });
  }

  loader(pageIndex, pageSize) {
    var vm = this;

    vm.CRUDService.read({
      mode: 'readonly', //$stateParams.mode, // Is always readonly to get all records
      catalogName: vm.$stateParams.catalogName,
      filters: vm.$stateParams.filters || '',
      controlType: 'cardView',
      getData: "1",
      getStructure: "1",
      pageIndex: pageIndex || vm.$stateParams.pageIndex || '1',
      pageSize: pageSize || vm.$stateParams.pageSize || '8'
    }).then(function (res) {
      vm.catalog = res.data.catalog || {};
      vm.data = res.data.model || [];
      vm.cards = res.data.cards;
      vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label);
    });
  }

  // ToDo: Use catalog parameter (as in GridCtrl) for nested cardsView
  onOpen(selected) {
    var vm = this;
    var idType = (!!vm.catalog.identityKey) ? 'identityKey' : 'primaryKey';
    var idKey = vm.catalog[idType];
    var idValue = selected[idKey];

    vm.$scope.$emit('goToState', 'main.panel.form', {
      catalogName: vm.catalog.catalogName,
      mode: vm.mode,
      [idType]: idKey,
      id: idValue
    });
  }

  onPaginationChange(newPage) {
    var vm = this;
    vm.loader(newPage+'');
  }
}

CardsCtrl.$inject = ['$scope', '$stateParams', 'CRUDService', 'DebugService'];
