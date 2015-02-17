'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:DebugCtrl
 * @description
 * # DebugCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('DebugCtrl', function($scope, $modalInstance, currentNavBranch) {

		$scope.currentNavBranch = currentNavBranch;

		$scope.ok = function() {
			$modalInstance.close(/**$scope.selected.item**/);
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};

	});