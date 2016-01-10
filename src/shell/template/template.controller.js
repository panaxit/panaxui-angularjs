import BaseCtrl from '../base/base.controller'
import _ from 'lodash'

export default class TemplateCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService) {
    super($scope, DebugService, $stateParams, CRUDService)
  }

  loader(overrideMetadata = {}) {
    var vm = this
    var params

    const metadata = _.extend({}, vm.$stateParams, overrideMetadata)

    params = {
      catalogName: metadata.catalogName,
      controlType: 'fileTemplate',
      mode: 'readonly', // Note: Treat templates as readonly
      filters: metadata.filters || '',
      getData: '1',
      getStructure: '1',
      output: 'pate', // Invoke node-pate in the backend
      pageIndex: parseInt(metadata.pageIndex, 10) || 1,
      pageSize: parseInt(metadata.pageSize, 10) || 1,
    }
    vm.CRUDService.read(params).then(function(res) {
      // Main `options' object
      // to be consumed by directive(s)
      vm.options = {
        metadata: res.data.data.metadata,
        fields: undefined,
        data: res.data.template || '',
        opts: vm.getOpts(),
      }

      if (!metadata.catalogName) { // Hacky way to know if directed is not nested
        vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label)
      }
      // Set `vm.loaderOnce` at first `vm.loader()` call
      if (vm.loadedOnce === undefined) {
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
