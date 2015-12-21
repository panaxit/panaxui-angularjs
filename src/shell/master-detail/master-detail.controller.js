import FormCtrl from '../form/form.controller';

export default class MasterDetailCtrl extends FormCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService, PayloadService) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService, PayloadService);
  }

  loader(pageIndex, pageSize) {
    var vm = this;
    var params = {
      catalogName: vm.$stateParams.catalogName,
      controlType: 'masterDetail',
      mode: vm.$stateParams.mode,
      filters: vm.$stateParams.filters || '',
      getData: '1',
      getStructure: '1',
      pageIndex: pageIndex || parseInt(vm.$stateParams.pageIndex) || 1,
      pageSize: pageSize || parseInt(vm.$stateParams.pageSize) || 25
    };
    vm.CRUDService.read(params).then(function (res) {
      // Main `options' object
      // to be consumed by directive(s)
      vm.options = {
        metadata: res.data.data.metadata,
        fields_grid: res.data.data.fields.grid.slice(0,5),
        fields: res.data.data.fields.form,
        data_grid: res.data.data.model || [],
        data: [],
        opts: vm.getOpts()
      };

      vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label);
      // Set `vm.loaderOnce` at first `vm.loader()` call
      if(vm.loadedOnce === undefined) {
        vm.loadedOnce = true;
      }
    });
  }

  getOpts() {
    var vm = this;
    return {
      // Grid
      showAddRemoveRow: vm.$stateParams.mode === 'edit',
      showNextRow: false,
      showRowActionsColumn: false,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      enableFullRowSelection: true,
      multiSelect: false,
      enableCellEdit: false,
      // Form
      asyncPagination: false,
      showSaveRow: true,
      showFilterRow: false,
      // Both
      showPaginationRow: true
    };
  }

  /*
  Common Handlers
  (unique & overriden from BaseCtrl)
   */

  onSelectionChange(row) {
    var vm = this;
    if(row.isSelected) {
      vm.options.data = [row.entity];
    } else {
      vm.options.data = [];
    }
  }
}
