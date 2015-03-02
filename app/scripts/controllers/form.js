'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('FormCtrl', function($scope, CRUDService) {

		var currentBranch = $scope.navMenuControl.get_selected_branch();

		// Schema
		$scope.schema = {};

		// Form
		$scope.form = [];

		// Model
		$scope.model = {};

		// Load everything
		$scope.loadSchemaForm = function() {
			CRUDService.read(currentBranch.data).then(function (res) {
				$scope.schema = res.data.schema;
				$scope.form = res.data.form;
			});
		};

		$scope.loadSchemaForm();

		// Reload listener
		$scope.$on('reloadSchemaForm', function (event, next) {
			$scope.loadSchemaForm();
		});
	});