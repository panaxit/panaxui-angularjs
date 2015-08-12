export default class CardsCtrl {
  constructor($scope, $stateParams, $q, CRUDService, DebugService) {
    var vm = this;

    vm.$scope = $scope;
    vm.$stateParams = $stateParams;
    vm.$q = $q;
    vm.CRUDService = CRUDService;
    vm.DebugService = DebugService;

    vm.mode = $stateParams.mode;

    // Initially set defaults, load & configure
    vm.defaults();
    vm.load().then(() => { vm.configure(); });

    vm.$scope.$on('reloadData', function (event, next) {
      vm.load();
    });

    vm.$scope.$on('openDebugModal', (event, next) => { vm.openDebugModal(); });
  }

  defaults() {
    var vm = this;
    // Default options
    vm.options = {
      // Pagination options
      paginationPageSizes: [4, 8, 16, 32, 64, 128],
      currentPage: parseInt(vm.$stateParams.pageIndex) || 1,
      paginationPageSize: parseInt(vm.$stateParams.pageSize) || 8
    };
  }

  load(pageIndex, pageSize) {
    var vm = this;
    var deferred = this.$q.defer();
    vm.CRUDService.read({
      mode: 'readonly', //$stateParams.mode, // Is always readonly to get all records
      catalogName: vm.$stateParams.catalogName,
      filters: vm.$stateParams.filters || '',
      controlType: 'cardView',
      getData: "1",
      getStructure: "1",
      pageIndex: pageIndex || vm.options.currentPage,
      pageSize: pageSize || vm.options.paginationPageSize
    }).then(function (res) {
      vm.catalog = res.data.catalog || {};
      vm.data = res.data.model || [];
      vm.cards = res.data.cards;
      vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label);
      deferred.resolve(res.data);
    });
    return deferred.promise;
  }

  configure() {
    var vm = this;
    if(vm.catalog.totalItems) {
      vm.options.totalItems = vm.catalog.totalItems;
      vm.options.paginationPageSize = vm.catalog.pageSize;
      vm.options.currentPage = vm.catalog.pageIndex;
    }
  }

  openDebugModal() {
    var vm = this;
    vm.DebugService.show({
      catalog: vm.catalog,
      cards: vm.cards,
      model: vm.data
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

  onPaginationChange(newPage, oldPage, newPageSize, oldPageSize) {
    var vm = this;
    if((oldPage!==undefined && newPage!==oldPage) || (oldPageSize!==undefined && newPageSize!==newPageSize)) {
      vm.load(newPage, newPageSize);
      return;
    }
  }
}

CardsCtrl.$inject = ['$scope', '$stateParams', '$q', 'CRUDService', 'DebugService'];
