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

		return authService;
	}]);