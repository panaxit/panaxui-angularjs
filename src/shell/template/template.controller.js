import BaseCtrl from '../base/base.controller'
import _ from 'lodash'

export default class TemplateCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService) {
    super($scope, DebugService, $stateParams, CRUDService)
  }

  loader(overrideParams = {}) {
    var vm = this

    const params = _.extend({}, vm.$stateParams, overrideParams)

    vm.CRUDService.read({
      catalogName: params.catalogName,
      controlType: 'fileTemplate',
      mode: 'readonly', // Note: Treat templates as readonly
      filters: params.filters || '',
      getData: '1',
      getStructure: '1',
      output: 'pate', // Invoke node-pate in the backend
      pageIndex: parseInt(params.pageIndex, 10) || 1,
      pageSize: parseInt(params.pageSize, 10) || 1,
    }).then(function(res) {
      // Main `options' object
      // to be consumed by directive(s)
      vm.options = {
        metadata: res.data.data.metadata,
        fields: undefined,
        data: res.data.template || '',
        opts: vm.getOpts(),
      }

      if (!overrideParams.catalogName) { // Hacky way to know if directed is not nested
        vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label)
      } else if (vm.loadedOnce === undefined) {
        // Set `vm.loadedOnce` at first `vm.loader()` call
        vm.loadedOnce = true
      }
    })
  }

  getOpts() {
    return {
      showPrintRow: true,
    }
  }

}
