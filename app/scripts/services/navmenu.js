'use strict';

/**
 * @ngdoc service
 * @name panaxuiApp.NavMenu
 * @description
 * # NavMenu
 * Factory in the panaxuiApp.
 */
angular.module('panaxuiApp')
	.factory('NavMenu', ['$q', '$http', function($q, $http) {
		// Service logic
		var getData = function() {
			var deferred = $q.defer();
			$http.get("dummy/menu.json").then(function(response) {
				deferred.resolve(response.data);
			});

			return deferred.promise;
		};

		// Public API here
		return {
			getData: getData
		};
	}]);