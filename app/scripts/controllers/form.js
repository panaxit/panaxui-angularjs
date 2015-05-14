'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.run(function config(formlyConfig) {
    /*
	    async_select
	    Extends select template
     */
    formlyConfig.setType({
      name: 'async_select',
      extends: 'select',
      defaultOptions: {
        templateOptions: {
          options: [],
          valueProp: "value",
          labelProp: "label",
        },
        controller: /* @ngInject */ function($scope, CRUDService) {
          $scope.to.loading = CRUDService.options($scope.to.params).then(function(res) {
            $scope.to.options = res;
            // note, the line above is shorthand for:
            // $scope.options.templateOptions.options = data;
            return res;
          });
        }
      }
    });
  })

	.controller('FormCtrl', function($scope, $stateParams, CRUDService, AlertService, DebugService) {

		// Model
		$scope.model = {};

		// Fields 
		$scope.fields = [];

		// Load model and fields into form
		$scope.loadForm = function() {
			// Set API params
			var params = {
				mode: $stateParams.mode,
				catalogName: $stateParams.catalogName,
				controlType: 'formView',
				getData: '1',
				getStructure: '1'
			};
			if($stateParams.id)
				params.filters = '\'id=' + $stateParams.id + '\''; // ToDo: Arbitriary Identity Key Name

			CRUDService.read(params).then(function (res) {
				// Catalog
				$scope.catalog = res.data.catalog;
				// Panel Title
				$scope.$emit('setPanelTitle', (function () {
					if($scope.catalog.mode === 'insert') return 'New ';
					if($scope.catalog.mode === 'edit') return 'Edit ';
					if($scope.catalog.mode === 'readonly') return 'View ';
				})() + $scope.catalog.tableName);
				// model
				$scope.model = res.data.model[0] || {};
				// fields
				$scope.fields = res.data.fields || [];
			});
		};
		$scope.loadForm();

		// Reload listener
		$scope.$on('reloadData', function (event, next) {
			$scope.loadForm();
		});

		// Reset handler
		$scope.onReset = function() {
			// // ToDo: Confirm
	    // // $scope.loadForm();
	    // Alt: http://angular-formly.com/#/example/form-options/reset-model
			// ToDo: Confirm
	    if (pxForm) {
	      pxForm.$setPristine();
	      pxForm.$setUntouched();
	      $scope.model = {};
	    }
		};

		// Cancel handler
		$scope.onCancel = function() {
			// ToDo: Confirm of unsaved dirty form otherwise/then Go Back
			console.log("CANCEL")
		};

		// Submit handler
		$scope.onSubmit = function(pxForm) {
			if (pxForm.$valid) {
				/**
				 * Create payload to be sent
				 */
				var payload = {
			  	tableName: $scope.catalog.catalogName,
			  	primaryKey: $scope.catalog.primaryKey,
			  	identityKey: $scope.catalog.identityKey
				};
				/**
				 * Copy only dirty fields
				 */
				var dirty_model = {};
				angular.forEach($scope.fields, function (el) {
					if(el.formControl.$dirty)
						dirty_model[el.key] = el.formControl.$modelValue || el.formControl.$viewValue;
				});
				// Set DataRows
				payload.dataRows = [dirty_model];
				/**
				 * Perform Insert/Update in backend
				 */
				if($scope.catalog.mode === 'insert') {
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
								$scope.$emit('goToState', 'main.panel.form.view', {
									catalogName: res.data[0].dataTable,
									mode: 'edit',
									id: res.data[0].primaryValue || res.data[0].identityValue
								});
							}
						} else {
							// Do nothing. HTTP 500 responses handled by ErrorInterceptor
						}
					});
				} else if($scope.catalog.mode === 'edit' && pxForm.$dirty) {
					/**
					 * mode = EDIT
					 */
					// Set primaryKey and/or identityKey as DataRow with current value
					if(payload.primaryKey)
						payload.dataRows[0][payload.primaryKey] = $stateParams.id;
					if(payload.identityKey)
						payload.dataRows[0][payload.identityKey] = $stateParams.id;
					// Backend update call
					CRUDService.update(payload).then(function (res) {
						if(res.success === true) {
							if(res.data[0].status === 'error') {
								AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
							} else if(res.data[0].status === 'success') {
								AlertService.show('success', 'Saved', 'Record successfully saved');
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
				currentUser: $scope.currentUser,
				stateParams: $stateParams,
				catalog: $scope.catalog,
				fields: $scope.fields,
				model: $scope.model
			});
		});
	});