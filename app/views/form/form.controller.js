export default class FormCtrl {
  constructor($scope, $stateParams, CRUDService, AlertService, DebugService) {
    var vm = this;

    vm.$scope = $scope;
    vm.$stateParams = $stateParams;
    vm.CRUDService = CRUDService;
    vm.AlertService = AlertService;
    vm.DebugService = DebugService;

    vm.loader();

    vm.$scope.$on('reloadData', function (event, next) {
      vm.loader();
    });

    // open Debug Modal and resolve `form-specific` objects
    vm.$scope.$on('openDebugModal', (event, next) => { vm.openDebugModal(); });
  }

  openDebugModal() {
    var vm = this;
    vm.DebugService.show({
      catalog: vm.catalog,
      form: vm.fields,
      model: vm.data
    });
  }

  loader(pageIndex, pageSize) {
    var vm = this;
    var params = {
      mode: vm.$stateParams.mode,
      catalogName: vm.$stateParams.catalogName,
      filters: vm.$stateParams.filters || '',
      controlType: 'formView',
      getData: '1',
      getStructure: '1',
      pageIndex: pageIndex || vm.$stateParams.pageIndex || '1',
      pageSize: pageSize || vm.$stateParams.pageSize || '1'
    };
    if(vm.$stateParams.id) {
      // Fallback options
      var idKey = vm.$stateParams.identityKey || vm.$stateParams.primaryKey || 'id';
      params.filters += '[' + idKey + '=' + vm.$stateParams.id + ']';
    }
    vm.CRUDService.read(params).then(function (res) {
      vm.catalog = res.data.catalog;
      vm.data = res.data.model || [];
      vm.fields = res.data.fields || [];
      vm.$scope.$emit('setPanelTitle', (function () {
        if(vm.catalog.mode === 'insert') return 'New ';
        if(vm.catalog.mode === 'edit') return 'Edit ';
        if(vm.catalog.mode === 'readonly') return 'View ';
      })() + vm.catalog.tableName);
    });
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
      vm.options.resetModel();
      vm.form.$setPristine();
      vm.form.$setUntouched();
    }
  }

  onCancel() {
    // ToDo: Confirm of unsaved dirty form otherwise/then Go Back
    console.log("CANCEL");
  }

  onSubmit() {
    var vm = this;
    if (vm.form.$valid) {
      /**
       * Create payload to be sent
       */
      var payload = vm.buildPersistPayload(vm.fields, vm.data, vm.catalog);
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
              vm.AlertService.show('success', 'Saved', 'Record successfully saved');
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
              vm.AlertService.show('success', 'Saved', 'Record successfully saved');
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
      } else {
        vm.AlertService.show('info', 'Info', 'No changes');
      }
    } else {
      vm.AlertService.show('warning', 'Warning', 'Invalid form');
    }
  }

  onPaginationChange(newPage) {
    var vm = this;
    vm.loader(newPage+'');
  }

  /**
   * Create data table payload to be sent
   */
  buildPersistPayload(form, model, catalog) {

    var dirtyFieldsIterator = function(obj, dirty_model, orig_model) {
      angular.forEach(obj, function (el) {
        // fieldset / tab
        if(el.fields) {
          dirtyFieldsIterator(el.fields, dirty_model, orig_model);
        }
        // tabs
        if(el.tabs) {
          dirtyFieldsIterator(el.tabs, dirty_model, orig_model);
        }
        // Nested Form
        if(el.data && el.data.fields) {
          dirty_model[el.key] = {
            tableName: el.data.catalog.catalogName,
            primaryKey: el.data.catalog.primaryKey,
            identityKey: el.data.catalog.identityKey,
            foreignReference: el.data.catalog.foreignReference
          };
          if(el.data.catalog.mode === 'insert') {
            dirty_model[el.key].insertRows = [{}];
            dirtyFieldsIterator(el.data.fields, dirty_model[el.key].insertRows[0], orig_model[el.key]);
          } else if(el.data.catalog.mode === 'edit') {
            dirty_model[el.key].updateRows = [{}];
            dirtyFieldsIterator(el.data.fields, dirty_model[el.key].updateRows[0], orig_model[el.key]);
          }
        }
        // fieldGroup (async_select, ...)
        if(el.fieldGroup) {
          dirtyFieldsIterator(el.fieldGroup, dirty_model, orig_model);
        }
        // Copy regular field's value
        if(el.formControl && el.formControl.$dirty && orig_model.hasOwnProperty(el.key)) {
          dirty_model[el.key] = el.formControl.$modelValue || el.formControl.$viewValue;
        }
      });
    };

    var payload = {
      tableName: catalog.catalogName,
      primaryKey: catalog.primaryKey,
      identityKey: catalog.identityKey
    };

    if(catalog.mode === 'insert') {
      payload.insertRows = [{}];
      dirtyFieldsIterator(form, payload.insertRows[0], model[0]);
    } else if(catalog.mode === 'edit') {
      payload.updateRows = [{}];
      dirtyFieldsIterator(form, payload.updateRows[0], model[0]);
      // Set primaryKey and/or identityKey as DataRow with current value
      if(!!payload.primaryKey)
        payload.updateRows[0][payload.primaryKey] = model[0][payload.primaryKey];
      if(!!payload.identityKey)
        payload.updateRows[0][payload.identityKey] = model[0][payload.identityKey];
    }

    return payload;
  }
}

FormCtrl.$inject = ['$scope', '$stateParams', 'CRUDService', 'AlertService', 'DebugService'];
