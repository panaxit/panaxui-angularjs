'use strict';

/**
 * @ngdoc service
 * @name panaxuiApp.AuthInterceptor
 * @description
 * # AuthInterceptor
 * Factory in the panaxuiApp.
 */
angular.module('panaxuiApp')
	.factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
		return {
			responseError: function(response) {
				$rootScope.$broadcast({
					401: AUTH_EVENTS.notAuthenticated,
					//403: AUTH_EVENTS.notAuthorized, // ToDo: Roles
					419: AUTH_EVENTS.sessionTimeout, // ToDo
					440: AUTH_EVENTS.sessionTimeout // ToDo
				}[response.status], response);
				return $q.reject(response);
			}
		};
	})
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    //loginFailed: 'auth-login-failed',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    logoutSuccess: 'auth-logout-success'
  });