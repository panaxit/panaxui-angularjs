import BaseCtrl from '../base/base.controller';

export default class CardsCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService) {
    super($scope, DebugService, $stateParams, CRUDService);
  }

  loader(pageIndex, pageSize) {
    var vm = this;
    var params = {
      catalogName: vm.$stateParams.catalogName,
      controlType: 'cardsView',
      mode: vm.$stateParams.mode,
      filters: vm.$stateParams.filters || '',
      getData: "1",
      getStructure: "1",
      pageIndex: pageIndex || parseInt(vm.$stateParams.pageIndex) || 1,
      pageSize: pageSize || parseInt(vm.$stateParams.pageSize) || 8
    };
    vm.CRUDService.read(params).then(function (res) {
      vm.catalog = res.data.catalog || {};
      vm.data = res.data.model || [];
      vm.fields = res.data.fields;

      vm.setOptions();
      vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label);
    });
  }

  setOptions() {
    var vm = this;
    vm.options = {
      asyncPagination: true,
      showPaginationRow: true,
      showBrowseRow: vm.$stateParams.mode === 'browse',
      showAddRemoveRow: vm.catalog.mode === 'edit',
      showFilterRow: true
    };
  }

  // ToDo: Use catalog parameter (as in GridCtrl) for nested cardsView
  onOpen(selected) {
    var vm = this;
    var idType = (!!vm.catalog.identityKey) ? 'identityKey' : 'primaryKey';
    var idKey = vm.catalog[idType];
    var idValue = selected[idKey];

    vm.$scope.$emit('goToState', 'main.panel.form', {
      catalogName: vm.catalog.catalogName,
      mode: vm.catalog.mode,
      [idType]: idKey,
      id: idValue
    });
  }

  onNew(catalogName) {
    this.$scope.$emit('goToState', 'main.panel.form', {
      catalogName: catalogName,
      mode: 'insert',
      id: undefined
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
