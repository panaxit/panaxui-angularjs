'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:DebugCtrl
 * @description
 * # DebugCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('DebugCtrl', function($scope, $modalInstance, debugInfo) {

		// Set providers
		$scope.debugInfo = debugInfo;

		// Ok  clicked
		$scope.okClick = function() {
			$modalInstance.close(); // promise fulfilled
		};

	});