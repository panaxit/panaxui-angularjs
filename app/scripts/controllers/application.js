'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('ApplicationCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', 'Session', 'md5',
		function($scope, $rootScope, AUTH_EVENTS, AuthService, Session, md5) {

			$rootScope.currentUser = Session;

			$scope.logout = function() {
				AuthService.logout();
				$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
			};

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
				//}, function() {
				//	$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
				});
			};

		}
	]);
