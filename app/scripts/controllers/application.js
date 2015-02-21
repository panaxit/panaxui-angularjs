'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
	.controller('ApplicationCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService',
		function($scope, $rootScope, AUTH_EVENTS, AuthService) {

			$scope.currentUser = null;

			$scope.setCurrentUser = function(user) {
				$scope.currentUser = user;
			};

			$scope.logout = function() {
				AuthService.logout();
				$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
			};
		}
	]);