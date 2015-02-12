'use strict';

/**
 * @ngdoc directive
 * @name panaxuiApp.directive:contentPanel
 * @description
 * # contentPanel
 */
angular.module('panaxuiApp')
	.directive('contentPanel', function() {
		return {
			templateUrl: 'views/content-panel.html'
		};
	});