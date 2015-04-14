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

			/*
			Listed for events from children scopes: form, grid, cards, ...
			 */
			$scope.$on('goToBranchRoute', function (event, branch) {
				if (branch.level === 1)
					$state.go('main.home');
				else if (branch.children && branch.children.length)
					$state.go('main.category', {
						name: urlify(branch.label)
					});
				else
					$state.go('main.panel.' + branch.data.controlType, branch.data);
			});
			
	  	/*
	  	Broadcast events to children scopes: form, grid, cards, ...
	  	 */
	  	$scope.debugClick = function() {
	  		$scope.$broadcast('openDebugModal');
	  	};
		}
	]);