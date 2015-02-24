'use strict';

/**
 * @ngdoc service
 * @name panaxuiApp.AuthService
 * @description
 * # AuthService
 * Factory in the panaxuiApp.
 */
angular.module('panaxuiApp')
	.factory('AuthService', ['$http', '$q', 'Session', function($http, $q, Session) {
		var authService = {};

		// Login in the backend
		authService.login = function(credentials) {
			return $http
				.post('/api/session/login', credentials)
				.then(function (res) {
					Session.create(res.data);
					return res.data;
				});
		};

		// Check is a Session (client-side) exists
		authService.isAuthenticated = function() {
			return !!Session.userId;
		};

		// Get backend session info and persist it (client-side)
		authService.sessionInfo = function() {
	    var deferred = $q.defer();
			$http
				.get('/api/session/info')
				.then(function (response) {
					Session.create(response.data);
					deferred.resolve();
				});
			return deferred.promise;
		};

		// Get sitemap from backend
		authService.sitemap = function() {
	    var deferred = $q.defer();
	    $http
		    .get("/api/session/sitemap", {
		    	params: {
		    		gui: 'ng'
		    	}
		    })
		    .then(function (response) {
		      deferred.resolve(response.data);
		    });
	    return deferred.promise;
		};

		// Destroy Session in backend & client-side
		authService.logout = function() {
			return $http
				.get('/api/session/logout')
				.success(function (res) {
					Session.destroy();
				});
		};

		return authService;
	}]);