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

		// Model
		$scope.model = {};

		// Form
		$scope.form = [];

		// Load model and layout/fields into form
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
				// form
				$scope.form = res.data.form || [];
			});
		};
		$scope.loadForm();

		// Reload listener
		$scope.$on('reloadData', function (event, next) {
			$scope.loadForm();
		});

		// Reset handler
		$scope.onReset = function(pxForm) {
			// // ToDo: Confirm
	    // // $scope.loadForm();
	    // Alt: http://angular-formly.com/#/example/form-options/reset-model
			// ToDo: Confirm
	    if (pxForm) {
	      pxForm.$setPristine();
	      pxForm.$setUntouched();
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
        var dirtyFieldsIterator = function(obj, dirty_model, orig_model, orig_catalog) {
          angular.forEach(obj, function (el) {
            // fieldset / tab
            if(el.fields) {
              dirtyFieldsIterator(el.fields, dirty_model, orig_model, orig_catalog);
            }
            // tabs
            if(el.tabs) {
              dirtyFieldsIterator(el.tabs, dirty_model, orig_model, orig_catalog);
            }
            // fieldGroup
            if(el.fieldGroup) {
              // Nested model
              if(el.key){
                dirty_model[el.key] = {
                  tableName: orig_catalog[el.key].catalog.catalogName,
                  primaryKey: orig_catalog[el.key].catalog.primaryKey,
                  identityKey: orig_catalog[el.key].catalog.identityKey,
                  foreignReference: orig_catalog[el.key].catalog.foreignReference
                };
                if(orig_catalog[el.key].catalog.mode === 'insert') {
                  dirty_model[el.key].insertRows = [{}];
                  dirtyFieldsIterator(el.fieldGroup, dirty_model[el.key].insertRows[0],
                                      orig_model[el.key], orig_catalog[el.key].catalog);
                } else if(orig_catalog[el.key].catalog.mode === 'edit') {
                  dirty_model[el.key].updateRows = [{}];
                  dirtyFieldsIterator(el.fieldGroup, dirty_model[el.key].updateRows[0],
                                      orig_model[el.key], orig_catalog[el.key].catalog);
                }
              } else {
                dirtyFieldsIterator(el.fieldGroup, dirty_model, orig_model, orig_catalog);
              }
            }
            // Copy regular field's value
            if(el.formControl && el.formControl.$dirty && orig_model.hasOwnProperty(el.key)) {
              dirty_model[el.key] = el.formControl.$modelValue || el.formControl.$viewValue;
            }
          });
        };
        var dirty_model = {};
        dirtyFieldsIterator($scope.form, dirty_model, $scope.model, $scope.catalog);
				/**
				 * Perform Insert/Update in backend
				 */
				if($scope.catalog.mode === 'insert') {
					/**
					 * mode = INSERT
					 */
          // Set DataRows
          payload.insertRows = [dirty_model];
					// Backend create call
					CRUDService.create(payload).then(function (res) {
						if(res.success === true) {
							if(res.data[0].status === 'error') {
								AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
							} else if(res.data[0].status === 'success') {
								AlertService.show('success', 'Saved', 'Record successfully saved');
								// Go to 'edit' mode of newly created record
								$scope.$emit('goToState', 'main.panel.form.view', {
									catalogName: res.data[0].tableName,
									mode: 'edit',
									id:  res.data[0].identity
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
          // Set DataRows
          payload.updateRows = [dirty_model];
					// Set primaryKey and/or identityKey as DataRow with current value
					if(payload.primaryKey)
						payload.updateRows[0][payload.primaryKey] = $stateParams.id;
					if(payload.identityKey)
						payload.updateRows[0][payload.identityKey] = $stateParams.id;
					// Backend update call
					CRUDService.update(payload).then(function (res) {
						if(res.success === true) {
							if(res.data[0].status === 'error') {
								AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
							} else if(res.data[0].status === 'success') {
								AlertService.show('success', 'Saved', 'Record successfully saved');
								// Reset form to untouched & pristine
								// $scope.onReset
					      pxForm.$setPristine();
					      pxForm.$setUntouched();
					      // ToDo: Reload form? (to retrieve saved data and spot glitches via: $scope.loadForm(); ?
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
				form: $scope.form,
				model: $scope.model
			});
		});
	});
