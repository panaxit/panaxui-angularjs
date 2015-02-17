'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('MainCtrl', ['$scope', '$state', 'urlifyFilter', 'NavMenu', function MainCtrl($scope, $state, urlify, NavMenu) {

		$scope.showMenu = true;

		$scope.navMenu = NavMenu;

		$scope.treeHandler = function treeHandler(branch) {
			$scope.currentNavBranch = branch;
			$scope.goToRoute(branch);
		};

		$scope.goToRoute = function goToRoute(branch) {
			if(branch.level === 1) {
				$state.go('home');
			} else if (branch.children && branch.children.length > 0) {
				$state.go('home.category', {
					name: urlify(branch.label)
				});
			} else {
				$state.go('home.' + branch.data.controlType, branch.data);
			}

			//branch.selected = true;
		};

	}]);