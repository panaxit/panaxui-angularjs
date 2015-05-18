'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:DebugCtrl
 * @description
 * # DebugCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('DebugCtrl', function($scope, $modalInstance, formlyVersion, debugInfo) {

		// Set debugInfo provider
		$scope.debugInfo = debugInfo;

		$scope.debugInfo.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion
		}

		// Ok clicked
		$scope.okClick = function() {
			$modalInstance.close(); // promise fulfilled
		};

	});