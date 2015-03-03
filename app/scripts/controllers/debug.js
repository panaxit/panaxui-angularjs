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

		$scope.currentUser = currentUser;
		$scope.currentNavBranch = currentNavBranch;
		$scope.schema = schema;
		$scope.form = form;
		$scope.model = model;

		$scope.ok = function() {
			$modalInstance.close();
		};

	});