import angular from 'angular';

class ErrorInterceptor {
  constructor($rootScope, $q, ERROR_EVENTS) {
  	var vm = this;

  	vm.responseError = function(response) {
			$rootScope.$broadcast({
				500: ERROR_EVENTS.internalServer
			}[response.status], response);
			return $q.reject(response);
  	};
  }
}

ErrorInterceptor.$inject = ['$rootScope', '$q', 'ERROR_EVENTS'];

export default angular.module('app.error.interceptor', [])
  .service('ErrorInterceptor', ErrorInterceptor)
  .name;