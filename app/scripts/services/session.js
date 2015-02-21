'use strict';

/**
 * @ngdoc service
 * @name panaxuiApp.Session
 * @description
 * # Session
 * Service in the panaxuiApp.
 */
angular.module('panaxuiApp')
	.service('Session', function() {
		// AngularJS will instantiate a singleton by calling "new" on this function

		this.create = function(user) {
			//this.id = user.sessionId;
			this.userId = user.data.userId;
			this.username = user.data.username;
			//this.userRole = 'admin'; //user.userRole;
		};

		this.destroy = function() {
			//this.id = null;
			this.userId = null;
			this.username = null;
			//this.userRole = null;
		};

		return this;
	});