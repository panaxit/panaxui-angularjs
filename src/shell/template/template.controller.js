import BaseCtrl from '../base/base.controller';

export default class TemplateCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService) {
    super($scope, DebugService, $stateParams, CRUDService);
  }

  loader(pageIndex, pageSize, catalog) {
    var vm = this;

    catalog = catalog || {};

    var params = {
      catalogName: catalog.catalogName || vm.$stateParams.catalogName,
      controlType: 'fileTemplate',
      mode: 'readonly', // Note: Treat templates as readonly ftm //vm.$stateParams.mode,
      filters: catalog.filters || vm.$stateParams.filters || '',
      getData: "1",
      getStructure: "1",
      output: "pate", // Invoke node-pate in the backend
      pageIndex: pageIndex || parseInt(catalog.pageIndex || vm.$stateParams.pageIndex) || 1,
      pageSize: pageSize || parseInt(catalog.pageSize || vm.$stateParams.pageSize) || 1
    };
    vm.CRUDService.read(params).then(function (res) {
      vm.data = res.data || '';
      vm.catalog = catalog;
      vm.catalog.contentType = res.headers('Content-Type');
      vm.setOptions();
      if(!catalog.catalogName) // Hacky way to know if directed is not nested
        vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label);
    });
  }

  setOptions() {
    var vm = this;
    vm.options = {
      showPrintRow: true
    };
  }

}
