'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:DebugCtrl
 * @description
 * # DebugCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('DebugCtrl', function($scope, $modalInstance,
		stateParams, currentUser, catalog, schema, form, model) {

		// Set providers
		$scope.currentUser = currentUser;
		$scope.stateParams = stateParams;
		$scope.schema = schema;
		$scope.catalog = catalog;
		$scope.form = form;
		$scope.model = model;

		// Ok  clicked
		$scope.okClick = function() {
			$modalInstance.close(); // promise fulfilled
		};

	});