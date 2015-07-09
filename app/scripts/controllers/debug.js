'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:DebugCtrl
 * @description
 * # DebugCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('DebugCtrl', function($scope, $modalInstance, $location, formlyVersion, debugInfo) {

		// Set debugInfo provider
		$scope.debugInfo = debugInfo;

		$scope.debugInfo.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion
		};

    $scope.debugInfo.host = $location.host();
    $scope.debugInfo.port = $location.port();

		// Ok clicked
		$scope.okClick = function() {
			$modalInstance.close(); // promise fulfilled
		};

	});
