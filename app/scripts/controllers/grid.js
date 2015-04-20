'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:GridCtrl
 * @description
 * # GridCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('GridCtrl', function($scope, $q, $stateParams, $modal, CRUDService, AlertService, DebugService) {

		// Grid options
		$scope.gridOptions = {
			paginationPageSizes: [5, 10, 25, 50, 100, 500],
			paginationPageSize: 25,
	    rowHeight: 35,
			enableRowSelection: true,
	    multiSelect: true,
	    enableSelectAll: true,
	    selectionRowHeaderWidth: 35,
	    enableCellEdit: ($stateParams.mode === 'edit'),
	    enablePaginationControls: false,
	    showGridFooter: false
		};

		$scope.gridOptions.onRegisterApi = function(gridApi) {
			$scope.gridApi = gridApi;
			gridApi.rowEdit.on.saveRow($scope, $scope.onSaveRow);
		};

		$scope.getPage = function(num) {
			return new Array(num);
		};

		// Grid's data
		$scope.gridOptions.data = [];

		// Load grid's data
		$scope.loadGridData = function() {
			CRUDService.read({
				mode: $stateParams.mode,
				catalogName: $stateParams.catalogName,
				controlType: 'gridView',
				getData: "1",
				getStructure: "1"
			}).then(function (res) {
				// Catalog
				$scope.catalog = res.data.catalog;
				// Grid's Model
				$scope.gridOptions.data = res.data.model || [];
				// Grid's Schema
				$scope.schema = res.data.schema;
				// Grid's Column Definition (layout)
				$scope.gridOptions.columnDefs = res.data.grid;
				$scope.gridOptions.columnDefs.unshift({
					name: ' ',
					cellTemplate: 'views/grid.actions.html',
					width: '40',
					enableCellEdit: false,
					enableColumnMenus: false,
					enableFiltering: false,
					enableHiding: false,
					enableSorting: false,
				});
			});
		};
		$scope.loadGridData();

		// Reload listener
		$scope.$on('reloadData', function (event, next) {
			// ToDo: Redraw (re-render) grid. Ex.: when hiding, showing columns
			$scope.loadGridData();
		});

		// View/Edit handler
		$scope.onOpen =  function(selected) {
			var identifier = selected[$scope.catalog.primaryKey] ||
							 selected[$scope.catalog.identityKey];

			$scope.$emit('goToState', 'main.panel.form.view', {
				catalogName: $scope.catalog.catalogName,
				mode: $scope.catalog.mode,
				id: identifier
			});
		};

		// New handler
		$scope.onNew = function() {
			$scope.$emit('goToState', 'main.panel.form.view', {
				catalogName: $scope.catalog.catalogName,
				mode: 'insert',
				id: undefined
			});
		};

		// Save Row handler
		// Code based from `form.js`
	  $scope.onSaveRow = function (rowEntity) {
	    var promise = $q.defer();
	    $scope.gridApi.rowEdit.setSavePromise(rowEntity, promise.promise);

			/**
			 * Create payload to be sent
			 */
			var payload = {
		  	tableName: $scope.catalog.catalogName,
		  	primaryKey: $scope.catalog.primaryKey,
		  	identityKey: $scope.catalog.identityKey
			};

			// Set DataRows
			payload.dataRows = [rowEntity];

			CRUDService.update(payload).then(function (res) {
				if(res.success === true) {
					if(res.data[0].status === 'error') {
						AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
						promise.reject();
					} else if(res.data[0].status === 'success') {
						//AlertService.show('success', 'Saved', 'Record successfully saved');
						promise.resolve();
					}
				} else {
					// HTTP 500 responses handled by ErrorInterceptor
					promise.reject();
				}
			});
	  }; 

		// Delete handler
		// Code based from `form.js`
		$scope.onDelete = function() {
			var selected = $scope.gridApi.selection.getSelectedRows();

			if(confirm("Are your sure to Delete selected record(s)?")) {
				/**
				 * Create payload to be sent
				 */
				var payload = {
			  	tableName: $scope.catalog.catalogName,
			  	primaryKey: $scope.catalog.primaryKey,
			  	identityKey: $scope.catalog.identityKey
				};

				// Set DeleteRows
				payload.deleteRows = [];

				// Set primaryKey and/or identityKey as DeleteRows
				angular.forEach(selected, function(row, index) {
					var identifier = row[$scope.catalog.primaryKey] || 
													 row[$scope.catalog.identityKey];

					payload.deleteRows[index] = {};
					if(payload.primaryKey)
						payload.deleteRows[index][payload.primaryKey] = identifier;
					if(payload.identityKey)
						payload.deleteRows[index][payload.identityKey] = identifier;
				});

				CRUDService.delete(payload).then(function (res) {
					if(res.success === true) {
						if(res.data[0].status === 'error') {
							AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
						} else if(res.data[0].status === 'success') {
							AlertService.show('success', 'Deleted', 'Record successfully deleted');
							// Remove row(s) from Grid // http://stackoverflow.com/questions/26614641/how-to-properly-delete-selected-items-ui-grid-angular-js
							angular.forEach(selected, function(row, index) {
								$scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(row), 1);
							});
						}
					} else {
						// Do nothing. HTTP 500 responses handled by ErrorInterceptor
					}
				});
			}
		};

		// open Debug Modal and resolve `form-specific` objects
		$scope.$on('openDebugModal', function (event, next) {
			DebugService.show({
				currentUser: $scope.currentUser,
				stateParams: $stateParams,
				catalog: $scope.catalog,
				schema: $scope.schema,
				model: $scope.gridOptions.data
			});
		});

	});