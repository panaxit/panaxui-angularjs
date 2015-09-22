import BaseCtrl from '../base/base.controller';

export default class FormCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService, PayloadService) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService, undefined, PayloadService);
  }

  loader(pageIndex, pageSize) {
    var vm = this;
    var params = {
      catalogName: vm.$stateParams.catalogName,
      controlType: 'formView',
      mode: vm.$stateParams.mode,
      filters: vm.$stateParams.filters || '',
      getData: '1',
      getStructure: '1',
      pageIndex: pageIndex || parseInt(vm.$stateParams.pageIndex) || 1,
      pageSize: pageSize || parseInt(vm.$stateParams.pageSize) || 1
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
      vm.catalog = res.data.catalog;
      vm.fields = res.data.fields || [];
      vm.data = res.data.model || [];

      vm.setOptions();
      vm.$scope.$emit('setPanelTitle', (function () {
        if(vm.catalog.mode === 'insert') return 'New ';
        if(vm.catalog.mode === 'edit') return 'Edit ';
        if(vm.catalog.mode === 'readonly') return 'View ';
        if(vm.catalog.mode === 'filters') return 'Filters ';
      })() + vm.catalog.tableName);
    });
  }

  setOptions() {
    var vm = this;
    vm.options = {
      asyncPagination: true,
      showPaginationRow: true
    };
  }

  isSubmitDisabled() {
    var vm = this;
    if(vm.catalog && vm.catalog.mode !== 'readonly') {
      if(vm.catalog.mode === 'insert') {
        if(vm.form.$invalid)
          return true;
        return false;
      } else if(vm.catalog.mode === 'edit') {
        if(vm.form.$pristine)
          return true;
        if(vm.form.$invalid)
          return true;
        return false;
      }
    }
    return true;
  }

  onReset() {
    // // ToDo: Confirm
    // // vm.loader();
    // Alt: http://angular-formly.com/#/example/form-options/reset-model
    // ToDo: Confirm
    if (vm.form) {
      // http://jsbin.com/zaqeke
      //vm.$scope.options.resetModel();
      vm.form.$setPristine();
      vm.form.$setUntouched();
    }
  }

  onCancel() {
    // ToDo: Confirm of unsaved dirty form otherwise/then Go Back
    console.log("CANCEL");
  }

  onSubmit(fields, data) {
    var vm = this;
    if (vm.form.$valid) {
      /**
       * Create payload to be sent
       */
      var payload = vm.PayloadService.buildPersistPayload(fields || vm.fields, data || vm.data, vm.catalog);
      /**
       * Perform Insert/Update in backend
       */
      if(vm.catalog.mode === 'insert') {
        /**
         * mode = INSERT
         */
        // Backend create call
        vm.CRUDService.create(payload).then(function (res) {
          if(res.success === true) {
            if(res.data[0].status === 'error') {
              vm.AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
            } else if(res.data[0].status === 'success') {
              vm.AlertService.show('success', 'Saved', 'Record(s) successfully saved');
              // Go to 'edit' mode of newly created record
              vm.$scope.$emit('goToState', 'main.panel.form', {
                catalogName: res.data[0].tableName,
                mode: 'edit',
                id:  res.data[0].identity
              });
            }
          } else {
            // Do nothing. HTTP 500 responses handled by ErrorInterceptor
          }
        });
      } else if(vm.catalog.mode === 'edit' && vm.form.$dirty) {
        /**
         * mode = EDIT
         */
        // Backend update call
        vm.CRUDService.update(payload).then(function (res) {
          if(res.success === true) {
            if(res.data[0].status === 'error') {
              vm.AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
            } else if(res.data[0].status === 'success') {
              vm.AlertService.show('success', 'Saved', 'Record(s) successfully updated');
              // Reset form to untouched & pristine
              // vm.onReset
              vm.form.$setPristine();
              vm.form.$setUntouched();
              // ToDo: Reload form? (to retrieve saved data and spot glitches via: vm.loader(); ?
            }
          } else {
            // Do nothing. HTTP 500 responses handled by ErrorInterceptor
          }
        });
      } else if(vm.catalog.mode === 'filters' && vm.form.$dirty) {
        /**
         * mode = FILTERS
         */
        // Backend filters call
        vm.CRUDService.filters(payload).then(function (res) {
          if(res.success === true) {
              // Go to 'edit' mode of filtered records
              vm.$scope.$emit('goToState', 'main.panel.grid', {
                catalogName: vm.catalog.catalogName,
                mode: 'edit',
                filters:  '[' + res.data + ']'
              });
          } else {
            // Do nothing. HTTP 500 responses handled by ErrorInterceptor
          }
        });
      } else {
        vm.AlertService.show('info', 'Info', 'No changes');
      }
    } else {
      vm.AlertService.show('warning', 'Warning', 'Invalid form');
    }
  }

  onPaginationChange(newPage, newPageSize) {
    var vm = this;
    vm.loader(newPage, newPageSize);
  }
}
