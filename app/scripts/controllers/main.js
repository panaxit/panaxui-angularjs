'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('MainCtrl', function MainCtrl($scope, $state) {

		$scope.showMenu = true;

		$scope.menu = [{
			label: 'Kitchen Sink',
			children: [{
				label: 'Grids',
				children: [{
					label: 'Simple',
					data: {
						controlType: 'grid'
					}
				}]
			}, {
				label: 'Forms',
				children: [{
					label: 'Basic Controls',
					data: {
						controlType: 'form'
					}
				}, {
					label: 'Advanced Controls',
					data: {
						controlType: 'form'
					}
				}]
			}, {
				label: 'Relations',
				children: [{
					label: 'One-to-One: Nested Form',
					data: {
						controlType: 'form'
					}
				}, {
					label: 'One-to-Many: Nested Grid',
					data: {
						controlType: 'form'
					}
				}, {
					label: 'Cascaded: Comboboxes',
					data: {
						controlType: 'form'
					}
				}]
			}]
		}];

		$scope.navigationData = [{
			label: 'Home',
			children: $scope.menu
		}];

		$scope.currentNavBranch = 'Home';

		$scope.treeHandler = function treeHandler(branch) {
			$scope.currentNavBranch = branch;

			if(branch.level === 1) {
				$state.go('home');
			} else if (branch.children && branch.children.length > 0) {
				$state.go('home.category'); //todo Params name
			} else {
				$state.go('home.' + branch.data.controlType);
			}
		};

	});