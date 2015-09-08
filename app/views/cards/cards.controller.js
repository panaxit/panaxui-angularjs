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
      fields: vm.fields,
      model: vm.data
    });
  }

  loader(pageIndex, pageSize) {
    var vm = this;

    vm.CRUDService.read({
      mode: vm.$stateParams.mode,
      catalogName: vm.$stateParams.catalogName,
      filters: vm.$stateParams.filters || '',
      controlType: 'cardsView',
      getData: "1",
      getStructure: "1",
      pageIndex: pageIndex || parseInt(vm.$stateParams.pageIndex) || 1,
      pageSize: pageSize || parseInt(vm.$stateParams.pageSize) || 8
    }).then(function (res) {
      vm.catalog = res.data.catalog || {};
      vm.data = res.data.model || [];
      vm.fields = res.data.fields;
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

  onPaginationChange(newPage, newPageSize) {
    var vm = this;
    vm.loader(newPage, newPageSize);
  }

  onNext(selected) {
    var vm = this;
    var len = selected.length,
        idKey = vm.catalog.identityKey || vm.catalog.primaryKey,
        filters = '[' + idKey + ' IN (';
    angular.forEach(selected, function(row, index) {
      filters += `'${row[idKey]}'`;
      if(index !== len-1) {
        filters += ', ';
      }
    });
    filters += ')]';
    // ToDo: PanaxDB Routes
    vm.$scope.$emit('goToState', 'main.panel.form', {
      catalogName: vm.catalog.catalogName,
      mode: 'edit',
      filters: filters
    });
  }
}

CardsCtrl.$inject = ['$scope', '$stateParams', 'CRUDService', 'DebugService'];
