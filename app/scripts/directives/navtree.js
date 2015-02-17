'use strict';

/**
 * @ngdoc directive
 * @name panaxuiApp.directive:navTree
 * @description
 * # navTree
 */
angular.module('panaxuiApp')
	.directive('navTree', function() {
		return {
			templateUrl: 'views/shell/nav-tree.html'
		};
	});