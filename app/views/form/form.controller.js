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
      pageIndex: pageIndex || vm.$stateParams.pageIndex || 1,
      pageSize: pageSize || vm.$stateParams.pageSize || 1
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
      var payload = vm.CRUDService.buildPersistPayload(vm.fields, vm.data, vm.catalog);
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

  onPaginationChange(newPage, newPageSize) {
    var vm = this;
    vm.loader(newPage, newPageSize);
  }
}

FormCtrl.$inject = ['$scope', '$stateParams', 'CRUDService', 'AlertService', 'DebugService'];
