'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('MainCtrl', ['$scope', '$state', 'urlifyFilter', 'AuthService',
		function MainCtrl($scope, $state, urlify, AuthService) {

			// Show menu toggle
			$scope.showMenu = true;

			// abn-tree data array
			$scope.navMenuData = [{
				label: 'Home',
				children: []
			}];

			AuthService.sitemap().then(function (res) {
				$scope.navMenuData[0].children = res.data;
			});

			// abn-tree control api object
			$scope.navMenuControl = {};

			// Get route (state)
			$scope.getRoute = function (branch) {
				if (branch.level === 1)
					return ['main.home'];
				else if (branch.children && branch.children.length)
					return ['main.category', {
						name: urlify(branch.label)
					}];
				else
					return ['main.panel.' + branch.data.controlType, branch.data];
			};

			// Get Route SRef string
			$scope.getRouteSRef = function (branch) {
				var route = $scope.getRoute(branch);
				return route[0] + '(' + JSON.stringify(route[1] || '') + ')';
			};

			// Change route (state)
			$scope.goToRoute = function (branch) {
				$scope.navMenuControl.select_branch(branch); // ToDo: Should be in routeChanged event
				$state.go.apply(this, $scope.getRoute(branch));
			};
			
	  	/*
	  	Broadcast events to children scopes: form, grid, cards, ...
	  	 */
	  	$scope.debugClick = function() {
	  		$scope.$broadcast('openDebugModal');
	  	};
		}
	]);