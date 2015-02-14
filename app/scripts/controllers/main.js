'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('MainCtrl', function MainCtrl($scope, $state, navMenu) {

		$scope.navMenu = navMenu;

		$scope.showMenu = true;

		$scope.currentNavBranch = 'Home';

		$scope.treeHandler = function treeHandler(branch) {
			$scope.currentNavBranch = branch;

			if(branch.level === 1) {
				$state.go('home');
			} else if (branch.children && branch.children.length > 0) {
				$state.go('home.category', {
					name: branch.label.toLowerCase().replace(/\ /g, "_")
				});
			} else {
				$state.go('home.' + branch.data.controlType, branch.data);
			}
		};

	});