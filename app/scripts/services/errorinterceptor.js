'use strict';

/**
 * @ngdoc service
 * @name panaxuiApp.ErrorInterceptor
 * @description
 * # ErrorInterceptor
 * Factory in the panaxuiApp.
 */
angular.module('panaxuiApp')
  .factory('ErrorInterceptor', function($rootScope, $q, ERROR_EVENTS) {
		return {
			responseError: function(response) {
				$rootScope.$broadcast({
					500: ERROR_EVENTS.internalServer
				}[response.status], response);
				return $q.reject(response);
			}
		};
  });
