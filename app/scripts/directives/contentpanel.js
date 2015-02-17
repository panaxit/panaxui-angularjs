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
			templateUrl: 'views/shell/content-panel.html'
		};
	});