'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:GridCtrl
 * @description
 * # GridCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('GridCtrl', function($scope, $state, $modal, CRUDService) {

		// get currently selected navigation branch
		$scope.currentNavBranch = $scope.navMenuControl.get_selected_branch();

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
				mode: $scope.currentNavBranch.data.mode,
				catalogName: $scope.currentNavBranch.data.catalogName,
				controlType: $scope.currentNavBranch.data.controlType,
				getData: "1",
				getStructure: "0"
			}).then(function (res) {
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

		// New handler
		$scope.onNew = function() {

		};

		// Edit handler
		$scope.onEdit = function() {

		};

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
					currentUser: function() {
						return $scope.currentUser;
					},
					currentNavBranch: function() {
						return $scope.currentNavBranch;
					},
					schema: function() {
						return $scope.schema;
					},
					model: function() {
						return $scope.gridOptions.data;
					},
					form: null
				}
			});
			debugModalInstance.result.then(function() {
				//$log.info('Debug Modal dismissed at: ' + new Date());
			});
		});

	});