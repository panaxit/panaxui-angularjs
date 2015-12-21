import BaseCtrl from '../base/base.controller';
import _ from 'lodash';

export default class TemplateCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService) {
    super($scope, DebugService, $stateParams, CRUDService);
  }

  loader(pageIndex, pageSize, metadata) {
    var vm = this;

    metadata = metadata || {};

    var params = {
      catalogName: metadata.catalogName || vm.$stateParams.catalogName,
      controlType: 'fileTemplate',
      mode: 'readonly', // Note: Treat templates as readonly ftm //vm.$stateParams.mode,
      filters: metadata.filters || vm.$stateParams.filters || '',
      getData: "1",
      getStructure: "1",
      output: "pate", // Invoke node-pate in the backend
      pageIndex: pageIndex || parseInt(metadata.pageIndex || vm.$stateParams.pageIndex) || 1,
      pageSize: pageSize || parseInt(metadata.pageSize || vm.$stateParams.pageSize) || 1
    };
    debugger;
    vm.CRUDService.read(params).then(function (res) {
      // Main `options' object
      // to be consumed by directive(s)
      vm.options = {
        metadata: res.data.data.metadata,
        fields: undefined,
        data: res.data.template || '',
        opts: vm.getOpts()
      };

      if(!metadata.catalogName) {// Hacky way to know if directed is not nested
        vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label);
      }
      // Set `vm.loaderOnce` at first `vm.loader()` call
      if(vm.loadedOnce === undefined) {
        vm.loadedOnce = true;
      }
    });
  }

  getOpts() {
    var vm = this;
    return {
      showPrintRow: true
    };
  }

}
