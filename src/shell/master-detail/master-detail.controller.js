import FormCtrl from '../form/form.controller';

export default class MasterDetailCtrl extends FormCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService);
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
    if(vm.$stateParams.id) {
      // Fallback options
      var idKey = vm.$stateParams.identityKey ||
                  vm.$stateParams.primaryKey ||
                  '$identity' || // Supported in SQL Server only for tables
                  'id';       // Last resort
      params.filters += '[' + idKey + '=' + vm.$stateParams.id + ']';
    }
    vm.CRUDService.read(params).then(function (res) {
      vm.metadata = res.data.data.metadata;
      vm.fields = {
        grid: res.data.data.fields.grid,
        form: res.data.data.fields.form
      };
      vm.data = res.data.data.model || [];

      vm.setOptions();
      vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label);
    });
  }

  setOptions() {
    var vm = this;
    vm.options = {
      // Grid
      showAddRemoveRow: false,
      showNextRow: false,
      showRowActionsColumn: false,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      enableFullRowSelection: true,
      multiSelect: false,
      enableCellEdit: false,
      // Form
      asyncPagination: false,
      // Both
      showPaginationRow: false
    };
  }

  onSelectionChange(row) {
    var vm = this;
    if(row.isSelected) {
      vm.selected_record = [row.entity];
    } else {
      vm.selected_record = [];
    }
  }
}
