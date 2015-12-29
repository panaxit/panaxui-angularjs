import BaseCtrl from '../base/base.controller'

export default class GridCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService, $q) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService, $q)
  }

  loader(pageIndex, pageSize) {
    var vm = this
    var params = {
      catalogName: vm.$stateParams.catalogName,
      controlType: 'gridView',
      mode: vm.$stateParams.mode,
      filters: vm.$stateParams.filters || '',
      getData: '1',
      getStructure: '1',
      pageIndex: pageIndex || parseInt(vm.$stateParams.pageIndex, 10) || 1,
      pageSize: pageSize || parseInt(vm.$stateParams.pageSize, 10) || 25,
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
        // Set `vm.loaderOnce` at first `vm.loader()` call
      if (vm.loadedOnce === undefined) {
        vm.loadedOnce = true
      }
    })
  }

  getOpts() {
    var vm = this
    return {
      showAddRemoveRow: vm.$stateParams.mode === 'edit',
      showNextRow: vm.$stateParams.mode === 'browse',
      showPaginationRow: true,
      showRowActionsColumn: (['edit', 'readonly'].indexOf(vm.$stateParams.mode) > -1),
      enableRowSelection: (['edit', 'browse'].indexOf(vm.$stateParams.mode) > -1),
      enableRowHeaderSelection: (['edit', 'browse'].indexOf(vm.$stateParams.mode) > -1),
      enableFullRowSelection: vm.$stateParams.mode === 'browse',
      multiSelect: (['edit', 'browse'].indexOf(vm.$stateParams.mode) > -1),
      enableCellEdit: vm.$stateParams.mode === 'edit',
      enableFiltering: vm.$stateParams.mode === 'filters',
    }
  }

  /*
  Common Handlers
  (unique & overriden from BaseCtrl)
   */

  onRowChange(rowEntity) {
    // Save Row handler
    var vm = this
    var promise = vm.$q.defer()
    var payload

    // Do not update if not in edit mode
    if (vm.options.metadata.mode !== 'edit') {
      promise.reject()
      return promise.promise
    }

    /**
     * Create payload to be sent
     */
    payload = {
      tableName: vm.options.metadata.catalogName,
      primaryKey: vm.options.metadata.primaryKey,
      identityKey: vm.options.metadata.identityKey,
    }

    // Set DataRows
    payload.updateRows = [rowEntity]

    vm.CRUDService.update(payload).then(function(res) {
      if (res.success === true) {
        if (res.data[0].status === 'error') {
          vm.AlertService.show('danger', 'Error', res.data[0].statusMessage +
            ' [statusId: ' + res.data[0].statusId + ']')
          promise.reject()
        } else if (res.data[0].status === 'success') {
          //vm.AlertService.show('success', 'Saved', 'Record successfully saved');
          promise.resolve()
        }
      } else {
        // HTTP 500 responses handled by ErrorInterceptor
        promise.reject()
      }
    })

    return promise.promise
  }
}
