'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('FormCtrl', function($scope, $modal, CRUDService) {

		// get currently selected navigation branch
		$scope.currentNavBranch = $scope.navMenuControl.get_selected_branch();

		// Schema
		$scope.schema = {};

		// Form
		$scope.form = [];

		// Model
		$scope.model = {};

		// Load schema, form and model into form
		$scope.loadSchemaForm = function() {
			CRUDService.read($scope.currentNavBranch.data).then(function (res) {
				$scope.schema = res.data.schema;
				$scope.form = res.data.form || ['*'];
				$scope.model = res.data.model[0] || {};
			});
		};
		$scope.loadSchemaForm();

		// Reload listener
		$scope.$on('reloadSchemaForm', function (event, next) {
			$scope.loadSchemaForm();
		});

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
					form: function() {
						return $scope.form;
					},
					model: function() {
						return $scope.model;
					}
				}
			});
			debugModalInstance.result.then(function() {
				//$log.info('Debug Modal dismissed at: ' + new Date());
			});
		});
	});