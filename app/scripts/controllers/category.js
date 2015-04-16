'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('CategoryCtrl', function($scope, $stateParams, $modal, DebugService) {

  	// get currently selected navigation branch
		$scope.currentNavBranch = $scope.navMenuControl.get_selected_branch();

		// open Debug Modal and resolve `category-specific` objects
		$scope.$on('openDebugModal', function (event, next) {
			DebugService.show({
				currentUser: $scope.currentUser,
				stateParams: $stateParams
			});
  	});

	});