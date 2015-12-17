import BaseCtrl from '../base/base.controller';

export default class CardsCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService);
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
      // Main `options' object
      // to be consumed by directive(s)
      vm.options = {
        metadata: res.data.data.metadata,
        fields: res.data.data.fields,
        data: res.data.data.model || [],
        opts: vm.getOpts()
      };

      vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label);
      // Set `vm.loaderOnce` at first `vm.loader()` call
      vm.loadedOnce = true;
    });
  }

  getOpts() {
    var vm = this;
    return {
      asyncPagination: true,
      showPaginationRow: true,
      showBrowseRow: vm.$stateParams.mode === 'browse',
      showAddRemoveRow: vm.$stateParams.mode === 'edit',
      showFilterRow: true,
      showSelection: vm.$stateParams.mode !== 'readonly'
    };
  }

  onPaginationChange(newPage, newPageSize) {
    var vm = this;
    // Avoid double call to `vm.loader()` when first loaded
    if(vm.loadedOnce === true) {
      vm.loadedOnce = false;
      return;
    }
    vm.loader(newPage, newPageSize);
  }

  onNext(selected) {
    var vm = this;
    var len = selected.length,
        idKey = vm.options.metadata.identityKey || vm.options.metadata.primaryKey,
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
      catalogName: vm.options.metadata.catalogName,
      mode: 'edit',
      filters: filters
    });
  }
}
