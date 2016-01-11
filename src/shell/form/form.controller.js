import BaseCtrl from '../base/base.controller'
import _ from 'lodash'

export default class FormCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService, PayloadService) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService, undefined, PayloadService)
  }

  loader(overrideParams = {}) {
    var vm = this

    const params = _.extend({}, vm.$stateParams, overrideParams)

    vm.CRUDService.read({
      catalogName: params.catalogName,
      controlType: 'formView',
      mode: params.mode,
      filters: params.filters || '',
      getData: '1',
      getStructure: '1',
      pageIndex: parseInt(params.pageIndex, 10) || 1,
      pageSize: parseInt(params.pageSize, 10) || 1,
    }).then(function(res) {
      // Main `options' object
      // to be consumed by directive(s)
      vm.options = {
        metadata: vm.setReferrerValue(res.data.data.metadata),
        fields: res.data.data.fields,
        data: res.data.data.model || [],
        opts: vm.getOpts(),
      }

      vm.$scope.$emit('setPanelTitle', (function() {
        return {
          insert: 'New ',
          edit: 'Edit ',
          readonly: 'View ',
          filters: 'Filters ',
        }[params.mode]
      })() + vm.options.metadata.tableName)
    })
  }

  setReferrerValue(metadata) {
    var vm = this
    // Set Referrer property in model
    var ref = vm.$stateParams.ref
    var refId = vm.$stateParams.refId
    if (ref && refId) {
      metadata.ref = ref
      metadata.refId = refId
    }
    return metadata
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
    var idType = (!!vm.options.metadata.identityKey) ? 'identityKey' : 'primaryKey'
    var idKey = vm.options.metadata[idType]
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
                filters: `'${idKey}=${res.data[0].identity}'`,
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
