'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('FormCtrl', function($scope, $stateParams, CRUDService, AlertService, DebugService) {
    var vm = this;

		vm.loader = function() {
			var params = {
				mode: $stateParams.mode,
				catalogName: $stateParams.catalogName,
				controlType: 'formView',
				getData: '1',
				getStructure: '1'
			};
			if($stateParams.id) {
				params.filters = '\'id=' + $stateParams.id + '\''; // ToDo: Arbitriary Identity Key Name
      }
			CRUDService.read(params).then(function (res) {
				vm.catalog = res.data.catalog;
				vm.data = res.data.model[0] || {};
				vm.form = res.data.form || [];
        $scope.$emit('setPanelTitle', (function () {
          if(vm.catalog.mode === 'insert') return 'New ';
          if(vm.catalog.mode === 'edit') return 'Edit ';
          if(vm.catalog.mode === 'readonly') return 'View ';
        })() + vm.catalog.tableName);
			});
		};

    vm.loader();

		$scope.$on('reloadData', function (event, next) {
			vm.loader();
		});

		vm.onReset = function(pxForm) {
			// // ToDo: Confirm
	    // // vm.loader();
	    // Alt: http://angular-formly.com/#/example/form-options/reset-model
			// ToDo: Confirm
	    if (pxForm) {
	      pxForm.$setPristine();
	      pxForm.$setUntouched();
	    }
		};

		vm.onCancel = function() {
			// ToDo: Confirm of unsaved dirty form otherwise/then Go Back
			console.log("CANCEL")
		};

		// Submit handler
		vm.onSubmit = function(pxForm) {
			if (pxForm.$valid) {
				/**
				 * Create payload to be sent
				 */
        var payload = CRUDService.buildPersistPayload(vm.form, vm.data, vm.catalog, $stateParams.id);
				/**
				 * Perform Insert/Update in backend
				 */
				if(vm.catalog.mode === 'insert') {
					/**
					 * mode = INSERT
					 */
					// Backend create call
					CRUDService.create(payload).then(function (res) {
						if(res.success === true) {
							if(res.data[0].status === 'error') {
								AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
							} else if(res.data[0].status === 'success') {
								AlertService.show('success', 'Saved', 'Record successfully saved');
								// Go to 'edit' mode of newly created record
								$scope.$emit('goToState', 'main.panel.form', {
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
					CRUDService.update(payload).then(function (res) {
						if(res.success === true) {
							if(res.data[0].status === 'error') {
								AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
							} else if(res.data[0].status === 'success') {
								AlertService.show('success', 'Saved', 'Record successfully saved');
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
					AlertService.show('info', 'Info', 'No changes');
				}
			} else {
				AlertService.show('warning', 'Warning', 'Invalid form');
			}
		};

		// open Debug Modal and resolve `form-specific` objects
		$scope.$on('openDebugModal', function (event, next) {
			DebugService.show({
				catalog: vm.catalog,
				form: vm.form,
				model: vm.data
			});
		});
	});
