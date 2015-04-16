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

			/**
			 * Nav-Tree & Sitemap
			 */

			// abn-tree data array
			$scope.navMenuData = [{
				label: 'Home',
				children: []
			}];

			// Populate nav-tree with sitemap data
			AuthService.sitemap().then(function (res) {
				$scope.navMenuData[0].children = res.data;
			});

			// abn-tree control api object
			$scope.navMenuControl = {};

			/**
			 * Listen for events from children scopes: form, grid, cards, ...
			 */
			
			// Go to arbitriary state
			$scope.goToState = function(state, catalog) {
				$state.go(state, catalog);
			};
			// Go to arbitriary state and unselect nav-tree
			$scope.$on('goToState', function (event, state, catalog) {
				$scope.goToState(state, catalog);
				$scope.navMenuControl.select_branch(null);
			});
			// Go to state of selected branch (nav-tree)
			$scope.$on('goToBranch', function (event, branch) {
				if (branch.level === 1)
					$scope.goToState('main.home')
				else if (branch.children && branch.children.length)
					$scope.goToState('main.category', {
						name: urlify(branch.label)
					});
				else if (branch.data.controlType === 'gridView')
					$scope.goToState('main.panel.grid.view', branch.data);
				else if (branch.data.controlType === 'formView')
					$scope.goToState('main.panel.form.view', branch.data);
			});
			
	  	/*
	  	Broadcast events to children scopes: form, grid, cards, ...
	  	 */
	  	
	  	// Open debug modal
	  	$scope.debugClick = function() {
	  		$scope.$broadcast('openDebugModal');
	  	};

	  	// Reload data
	  	$scope.reloadClick = function() {
	  		$scope.$broadcast('reloadData');
	  	};
		}
	]);