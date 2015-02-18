'use strict';

/**
 * @ngdoc service
 * @name panaxuiApp.NavMenu
 * @description
 * # NavMenu
 * Factory in the panaxuiApp.
 */
angular.module('panaxuiApp')
	.factory('NavMenu', ['$resource', function($resource) {

		return $resource('dummy/menu.json', {}, {
			query: {
				method: 'GET',
				params: {},
				isArray: true
			}
		});

	}]);