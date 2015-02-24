'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('CategoryCtrl', function($scope) {

		$scope.currentBranch = $scope.navMenuControl.get_selected_branch();

		$scope.columnSize = ($scope.currentBranch.children.length <= 12) ? Math.floor(12 / $scope.currentBranch.children.length) : 1

	});