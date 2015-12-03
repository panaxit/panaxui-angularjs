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
      vm.metadata = res.data.data.metadata || {};
      vm.data = res.data.data.model || [];
      vm.fields = res.data.data.fields;

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
      showAddRemoveRow: vm.metadata.mode === 'edit',
      showFilterRow: true
    };
  }

  // ToDo: Use metadata parameter (as in GridCtrl) for nested cardsView
  onOpen(selected) {
    var vm = this;
    var idType = (!!vm.metadata.identityKey) ? 'identityKey' : 'primaryKey';
    var idKey = vm.metadata[idType];
    var idValue = selected[idKey];

    vm.$scope.$emit('goToState', 'main.panel.form', {
      catalogName: vm.metadata.catalogName,
      mode: vm.metadata.mode,
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
        idKey = vm.metadata.identityKey || vm.metadata.primaryKey,
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
      catalogName: vm.metadata.catalogName,
      mode: 'edit',
      filters: filters
    });
  }
}
