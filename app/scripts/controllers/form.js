'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('FormCtrl', function($scope, $stateParams, $modal, CRUDService, AlertService) {

		// Schema
		$scope.schema = {};

		// Form
		$scope.form = [];

		// Model
		$scope.model = {};

		// Load schema, form and model into form
		$scope.loadSchemaForm = function() {
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

				// ASF Model
				$scope.model = res.data.model[0] || {};

				// ASF Schema
				$scope.schema = res.data.schema || {};

				// ASF Form
				$scope.form = res.data.form || ['*'];
				var actions = {
					type: "actions",
					style: "pull-right",
					items: [
				    { 
				    	type: 'submit', 
				    	title: 'Save',
				    	style: 'btn-primary', 
				    	icon: 'glyphicon glyphicon-ok-sign'
				    }, { 
				    	type: 'button', 
				    	title: 'Reset', 
				    	onClick: "onReset(pxForm)",
				    	style: 'btn-info',
				    	icon: 'glyphicon glyphicon-retweet'
				    }, {
				    	type: 'button', 
				    	title: 'Cancel', 
				    	onClick: "onCancel()",
				    	style: 'btn-default', 
				    	icon: 'glyphicon glyphicon-ban-circle'
				    }
					]
				};
				if($scope.catalog.mode === 'edit')
					actions.items.splice(actions.items.length-1, 0, {
			    	type: 'button', 
			    	title: 'Delete', 
			    	onClick: "onSubmit(pxForm, true)",
			    	style: 'btn-danger',
			    	icon: 'glyphicon glyphicon-remove-circle'
					});
				$scope.form.push(actions);
			});
		};
		$scope.loadSchemaForm();

		// Submit handler
		$scope.onSubmit = function(pxForm, deletion) {
			// First we broadcast an event so all fields validate themselves
			$scope.$broadcast('schemaFormValidate');

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
				 * CRUDService calls
				 */
				if(deletion === true) {
					/**
					 * DELETE
					 */
					if(confirm("Are your sure to Delete record?")) {
						// Set DeleteRows
						payload.deleteRows = [{}];

						// Set primaryKey and/or identityKey as DeleteRow with current value
						if(payload.primaryKey)
							payload.deleteRows[0][payload.primaryKey] = $stateParams.id;
						if(payload.identityKey)
							payload.deleteRows[0][payload.identityKey] = $stateParams.id;

						CRUDService.delete(payload).then(function (res) {
							if(res.success === true) {
								if(res.data[0].status === 'error') {
									AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
								} else if(res.data[0].status === 'success') {
									AlertService.show('success', 'Deleted', 'Record successfully deleted');
									$scope.$emit('goToState', 'main.panel.gridView', {
										catalogName: res.data[0].dataTable,
										mode: 'edit'
									});
								}
							} else {
								// Do nothing. HTTP 500 responses handled by ErrorInterceptor
							}
						});
					}
				} else {
					/**
					 * Copy only dirty fields
					 */
					var dirty_model = {};
					angular.forEach($scope.model, function(value, key) {
						// ToDo: Bug
						// Some controls won't appear in FormController
						// https://www.pivotaltracker.com/story/show/91149432
					  //if(!pxForm[key] || pxForm[key].$dirty) 
					  if(pxForm[key] && pxForm[key].$dirty) 
					  	dirty_model[key] = $scope.model[key];
					});
					// Set DataRows
					payload.dataRows = [dirty_model];

					if($scope.catalog.mode === 'insert') {
						/**
						 * mode = INSERT
						 */
						CRUDService.create(payload).then(function (res) {
							if(res.success === true) {
								if(res.data[0].status === 'error') {
									AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
								} else if(res.data[0].status === 'success') {
									AlertService.show('success', 'Saved', 'Record successfully saved');
									$scope.$emit('goToState', 'main.panel.formView', {
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
				}
			} else {
				AlertService.show('warning', 'Warning', 'Invalid form');
			}
		}

		// Cancel handler
		$scope.onReset = function(pxForm) {
			// ToDo: Confirm
	    if (pxForm) {
	      pxForm.$setPristine();
	      pxForm.$setUntouched();
	      $scope.model = {};
	    }
		}

		// Cancel handler
		$scope.onCancel = function() {
			// ToDo: Confirm of unsaved dirty form otherwise/then Go Back
			console.log("CANCEL")
		}

		// Reload listener
		$scope.$on('reloadData', function (event, next) {
			$scope.loadSchemaForm();
		});

		// open Debug Modal and resolve `form-specific` objects
		$scope.$on('openDebugModal', function (event, next) {
			var debugModalInstance = $modal.open({
				templateUrl: 'views/shell/debug.html',
				controller: 'DebugCtrl',
				size: 'lg',
				resolve: {
					debugInfo: function() {
						return {
							currentUser: $scope.currentUser,
							stateParams: $stateParams,
							catalog: $scope.catalog,
							schema: $scope.schema,
							form: $scope.form,
							model: $scope.model
						};
					}
				}
			});
			debugModalInstance.result.then(function() {
				//$log.info('Debug Modal dismissed at: ' + new Date());
			});
		});
	});