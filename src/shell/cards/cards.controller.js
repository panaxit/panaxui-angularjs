import BaseCtrl from '../base/base.controller'
import _ from 'lodash'

export default class CardsCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService)
  }

  loader(overrideParams = {}) {
    var vm = this

    const params = _.extend({}, vm.$stateParams, overrideParams)

    vm.CRUDService.read({
      catalogName: params.catalogName,
      controlType: 'cardsView',
      mode: params.mode,
      filters: params.filters || '',
      getData: '1',
      getStructure: '1',
      pageIndex: parseInt(params.pageIndex, 10) || 1,
      pageSize: parseInt(params.pageSize, 10) || 8,
    }).then(function(res) {
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
