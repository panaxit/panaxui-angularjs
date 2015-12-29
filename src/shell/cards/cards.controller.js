import BaseCtrl from '../base/base.controller'

export default class CardsCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService)
  }

  loader(pageIndex, pageSize) {
    var vm = this
    var params = {
      catalogName: vm.$stateParams.catalogName,
      controlType: 'cardsView',
      mode: vm.$stateParams.mode,
      filters: vm.$stateParams.filters || '',
      getData: '1',
      getStructure: '1',
      pageIndex: pageIndex || parseInt(vm.$stateParams.pageIndex, 10) || 1,
      pageSize: pageSize || parseInt(vm.$stateParams.pageSize, 10) || 8,
    }
    vm.CRUDService.read(params).then(function(res) {
      // Main `options' object
      // to be consumed by directive(s)
      vm.options = {
        metadata: res.data.data.metadata,
        fields: res.data.data.fields,
        data: res.data.data.model || [],
        opts: vm.getOpts(),
      }

      vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label)
    })
  }

  getOpts() {
    var vm = this
    return {
      asyncPagination: true,
      showPaginationRow: true,
      showBrowseRow: vm.$stateParams.mode === 'browse',
      showAddRemoveRow: vm.$stateParams.mode === 'edit',
      showFilterRow: true,
      showSelection: vm.$stateParams.mode !== 'readonly',
    }
  }

  /*
  Common Handlers
  (unique & overriden from BaseCtrl)
   */

}
