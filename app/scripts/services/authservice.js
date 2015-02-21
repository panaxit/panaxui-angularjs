'use strict';

/**
 * @ngdoc service
 * @name panaxuiApp.AuthService
 * @description
 * # AuthService
 * Factory in the panaxuiApp.
 */
angular.module('panaxuiApp')
	.factory('AuthService', ['$http', '$resource', 'Session', function($http, $resource, Session) {
		var authService = {};

		authService.login = function(credentials) {
			return $http
				.post('/api/session/login', credentials)
				.then(function(res) {
					Session.create(res.data);
					return res.data;
				});
		};

		authService.isAuthenticated = function() {
			return !!Session.userId;
		};

		authService.logout = function() {
			Session.destroy();
		};

		authService.sitemap = function() {
			return $resource('dummy/menu.json', {}, { ///api/session/sitemap
				query: {
					method: 'GET',
					params: {
						gui: 'ng'
					},
					isArray: true
				}
			});
		};

		return authService;
	}]);