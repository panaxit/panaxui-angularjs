'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:DebugCtrl
 * @description
 * # DebugCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('DebugCtrl', function($scope, $modalInstance, currentNavBranch, currentUser) {

		$scope.currentUser = currentUser;
		$scope.currentNavBranch = currentNavBranch;

		$scope.ok = function() {
			$modalInstance.close();
		};

	});