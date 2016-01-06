import BaseCtrl from '../base/base.controller'

export default class FormCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService, PayloadService) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService, undefined, PayloadService)
  }

  loader(pageIndex, pageSize) {
    var vm = this
    var params = {
      catalogName: vm.$stateParams.catalogName,
      controlType: 'formView',
      mode: vm.$stateParams.mode,
      filters: vm.$stateParams.filters || '',
      getData: '1',
      getStructure: '1',
      pageIndex: pageIndex || parseInt(vm.$stateParams.pageIndex, 10) || 1,
      pageSize: pageSize || parseInt(vm.$stateParams.pageSize, 10) || 1,
    }
    vm.CRUDService.read(params).then(function(res) {
      // Main `options' object
      // to be consumed by directive(s)
      vm.options = {
        metadata: res.data.data.metadata,
        fields: res.data.data.fields,
        data: vm.setReferrerValue(res.data.data.model) || [],
        opts: vm.getOpts(),
      }

      vm.$scope.$emit('setPanelTitle', (function() {
        return {
          insert: 'New ',
          edit: 'Edit ',
          readonly: 'View ',
          filters: 'Filters ',
        }[vm.$stateParams.mode]
      })() + vm.options.metadata.tableName)
    })
  }

  setReferrerValue(model) {
    var vm = this
      // Set Referrer property in model
    var ref = vm.$stateParams.ref
    var refId = vm.$stateParams.refId
    if (ref && refId && model[0][ref] !== undefined) {
      model[0][ref] = refId
    }
    return model
  }

  getOpts() {
    var vm = this
    return {
      asyncPagination: true,
      showPaginationRow: true,
      showSaveRow: vm.$stateParams.mode === 'edit' || vm.$stateParams.mode === 'insert',
      showFilterRow: vm.$stateParams.mode === 'filters',
    }
  }

  /*
  Common Handlers
  (unique & overriden from BaseCtrl)
   */

  onReset() {
    var vm = this
    // // ToDo: Confirm
    // // vm.loader();
    // Alt: http://angular-formly.com/#/example/form-options/reset-model
    // ToDo: Confirm
    if (vm.form) {
      // http://jsbin.com/zaqeke
      //vm.$scope.options.resetModel();
      vm.form.$setPristine()
      vm.form.$setUntouched()
    }
  }

  onCancel() {
    // ToDo: Confirm of unsaved dirty form otherwise/then Go Back
  }

  onSubmit(fields, data) {
    var vm = this
    var payload
    if (vm.form.$valid) {
      /**
       * Create payload to be sent
       */
      payload = vm.PayloadService.build(fields || vm.options.fields, data || vm.options.data, vm.options.metadata)
        /**
         * Perform Insert/Update in backend
         */
      if (vm.options.metadata.mode === 'insert') {
        /**
         * mode = INSERT
         */
        // Backend create call
        vm.CRUDService.create(payload).then(function(res) {
          if (res.success === true) {
            if (res.data[0].status === 'error') {
              vm.AlertService.show('danger', 'Error', res.data[0].statusMessage +
                ' [statusId: ' + res.data[0].statusId + ']')
            } else if (res.data[0].status === 'success') {
              vm.AlertService.show('success', 'Saved', 'Record(s) successfully saved')
                // Go to 'edit' mode of newly created record
              vm.$scope.$emit('goToState', 'main.panel.form', {
                catalogName: res.data[0].tableName,
                mode: 'edit',
                id: res.data[0].identity,
              })
            }
          } else {
            // Do nothing. HTTP 500 responses handled by ErrorInterceptor
          }
        })
      } else if (vm.options.metadata.mode === 'edit' && vm.form.$dirty) {
        /**
         * mode = EDIT
         */
        // Backend update call
        vm.CRUDService.update(payload).then(function(res) {
          if (res.success === true) {
            if (res.data[0].status === 'error') {
              vm.AlertService.show('danger', 'Error', res.data[0].statusMessage +
                ' [statusId: ' + res.data[0].statusId + ']')
            } else if (res.data[0].status === 'success') {
              vm.AlertService.show('success', 'Saved', 'Record(s) successfully updated')
                // Reset form to untouched & pristine
                // vm.onReset
              vm.form.$setPristine()
              vm.form.$setUntouched()
                // ToDo: Reload form? (to retrieve saved data and spot glitches via: vm.loader(); ?
            }
          } else {
            // Do nothing. HTTP 500 responses handled by ErrorInterceptor
          }
        })
      } else if (vm.options.metadata.mode === 'filters' && vm.form.$dirty) {
        /**
         * mode = FILTERS
         */
        // Backend filters call
        vm.CRUDService.filters(payload).then(function(res) {
          if (res.success === true) {
            // Go to 'edit' mode of filtered records
            vm.$scope.$emit('goToState', 'main.panel.grid', {
              catalogName: vm.options.metadata.catalogName,
              mode: 'edit',
              filters: '[' + res.data + ']',
            })
          } else {
            // Do nothing. HTTP 500 responses handled by ErrorInterceptor
          }
        })
      } else {
        vm.AlertService.show('info', 'Info', 'No changes')
      }
    } else {
      vm.AlertService.show('warning', 'Warning', 'Invalid form')
    }
  }
}
