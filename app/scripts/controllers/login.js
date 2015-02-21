'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('LoginCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', 'md5',
		function LoginCtrl($scope, $rootScope, AUTH_EVENTS, AuthService, md5) {

			$scope.credentials = {
				username: '',
				passworde: ''
			};

			$scope.login = function login(credentials) {
				AuthService.login({
					username: credentials.username,
					password: md5.createHash(credentials.password)
				}).then(function(user) {
					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
					$scope.setCurrentUser(user.data);
				//}, function() {
				//	$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
				});
			};

		}
	]);