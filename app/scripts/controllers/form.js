'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('FormCtrl', FormCtrl);

function FormCtrl($scope, $stateParams, CRUDService, AlertService, DebugService) {
  this.init.apply(this, arguments);
}

FormCtrl.prototype.init = function($scope, $stateParams, CRUDService, AlertService, DebugService) {
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
	vm.$scope.$on('openDebugModal', function (event, next) {
		vm.DebugService.show({
			catalog: vm.catalog,
			form: vm.form,
			model: vm.data
		});
	});
}

FormCtrl.prototype.loader = function() {
  var vm = this;
  var params = {
    mode: vm.$stateParams.mode,
    catalogName: vm.$stateParams.catalogName,
    controlType: 'formView',
    getData: '1',
    getStructure: '1'
  };
  if(vm.$stateParams.id) {
    params.filters = '\'id=' + vm.$stateParams.id + '\''; // ToDo: Arbitriary Identity Key Name
  }
  vm.CRUDService.read(params).then(function (res) {
    vm.catalog = res.data.catalog;
    vm.data = res.data.model[0] || {};
    vm.form = res.data.form || [];
    vm.$scope.$emit('setPanelTitle', (function () {
      if(vm.catalog.mode === 'insert') return 'New ';
      if(vm.catalog.mode === 'edit') return 'Edit ';
      if(vm.catalog.mode === 'readonly') return 'View ';
    })() + vm.catalog.tableName);
  });
}

FormCtrl.prototype.onReset = function(pxForm) {
  // // ToDo: Confirm
  // // vm.loader();
  // Alt: http://angular-formly.com/#/example/form-options/reset-model
  // ToDo: Confirm
  if (pxForm) {
    pxForm.$setPristine();
    pxForm.$setUntouched();
  }
}

FormCtrl.prototype.onCancel = function() {
  // ToDo: Confirm of unsaved dirty form otherwise/then Go Back
  console.log("CANCEL")
}

FormCtrl.prototype.onSubmit = function(pxForm) {
  var vm = this;
  if (pxForm.$valid) {
    /**
     * Create payload to be sent
     */
    var payload = vm.CRUDService.buildPersistPayload(vm.form, vm.data, vm.catalog, vm.$stateParams.id);
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
    } else if(vm.catalog.mode === 'edit' && pxForm.$dirty) {
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
            pxForm.$setPristine();
            pxForm.$setUntouched();
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
