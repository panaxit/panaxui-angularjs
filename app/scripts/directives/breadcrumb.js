'use strict';

/**
 * @ngdoc directive
 * @name panaxuiApp.directive:breadcrumb
 * @description
 * # breadcrumb
 */
angular.module('panaxuiApp')
	.directive('breadcrumb', function() {
		return {
			templateUrl: 'views/shell/breadcrumb.html'
		};
	});