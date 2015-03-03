'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:DebugCtrl
 * @description
 * # DebugCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('DebugCtrl', function($scope, $modalInstance, currentNavBranch, currentUser, schema, form, model) {

		// Set providers
		$scope.currentUser = currentUser;
		$scope.currentNavBranch = currentNavBranch;
		$scope.schema = schema;
		$scope.form = form;
		$scope.model = model;

		// Ok  clicked
		$scope.okClick = function() {
			$modalInstance.close(); // promise fulfilled
		};

	});