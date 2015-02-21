'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('LoginCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService',
		function LoginCtrl($scope, $rootScope, AUTH_EVENTS, AuthService) {

			$scope.credentials = {
				username: '',
				passworde: ''
			};

			$scope.login = function login(credentials) {
				AuthService.login(credentials).then(function(user) {
					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
					$scope.setCurrentUser(user.data);
				//}, function() {
				//	$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
				});
			};

		}
	]);