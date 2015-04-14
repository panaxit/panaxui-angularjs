'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:GridCtrl
 * @description
 * # GridCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('GridCtrl', function($scope, $stateParams, $modal, CRUDService) {

		// Grid options
		$scope.gridOptions = {
			paginationPageSizes: [5, 10, 25, 50, 100, 500],
			paginationPageSize: 25,
			enableRowSelection: true,
	    enableSelectAll: true,
	    selectionRowHeaderWidth: 35,
	    rowHeight: 35,
	    multiSelect: false
		};

		$scope.gridOptions.onRegisterApi = function(gridApi) {
			$scope.gridApi = gridApi;
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
				getStructure: "0"
			}).then(function (res) {
				$scope.catalog = res.data.catalog;
				$scope.schema = res.data.schema;
				$scope.gridOptions.data = res.data.model || [];
			});
		};
		$scope.loadGridData();

		// Reload listener
		$scope.$on('reloadData', function (event, next) {
			// ToDo: Redraw (re-render) grid. Ex.: when hiding, showing columns
			$scope.loadGridData();
		});

		//New handler
		$scope.onNew = function() {
			$scope.$emit('goToState', 'main.panel.formView', {
				catalogName: $scope.catalog.catalogName,
				mode: 'insert',
				id: undefined
			});
		};

		// Edit handler
		// $scope.onEdit = function() {
		// 	$state.go('main.panel.formView', {
		// 		catalogName: $scope.catalog.catalogName,
		// 		mode: 'insert',
		// 		id: //
		// 	});
		// };

		// Delete handler
		$scope.onDelete = function() {

		};

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
							model: $scope.gridOptions.data
						};
					}
				}
			});
			debugModalInstance.result.then(function() {
				//$log.info('Debug Modal dismissed at: ' + new Date());
			});
		});

	});