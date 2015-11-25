import BaseCtrl from '../base/base.controller';

export default class TemplateCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService) {
    super($scope, DebugService, $stateParams, CRUDService);
  }

  loader(pageIndex, pageSize) {
    var vm = this;
    var params = {
      catalogName: vm.$stateParams.catalogName,
      controlType: 'fileTemplate',
      mode: 'readonly', // Note: Treat templates as readonly ftm //vm.$stateParams.mode,
      filters: vm.$stateParams.filters || '',
      getData: "1",
      getStructure: "1",
      output: "pate", // Invoke node-pate in the backend
      pageIndex: pageIndex || parseInt(vm.$stateParams.pageIndex) || 1,
      pageSize: pageSize || parseInt(vm.$stateParams.pageSize) || 8
    };
    vm.CRUDService.read(params).then(function (res) {
      vm.data = res.data || '';
      vm.catalog = {
        contentType: res.headers('Content-Type')
      };

      vm.setOptions();
      vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label);
    });
  }

  setOptions() {
    var vm = this;
    vm.options = {
    };
  }

}
