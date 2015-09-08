import angular from 'angular';

class AuthInterceptor {
  constructor($rootScope, $q, AUTH_EVENTS) {
  	var vm = this;

  	vm.responseError = function(response) {
			$rootScope.$broadcast({
				401: AUTH_EVENTS.notAuthenticated,
				//403: AUTH_EVENTS.notAuthorized, // ToDo: Roles
			}[response.status], response);
			return $q.reject(response);
  	};
  }
}

AuthInterceptor.$inject = ['$rootScope', '$q', 'AUTH_EVENTS'];

export default angular.module('app.auth.interceptor', [])
  .service('AuthInterceptor', AuthInterceptor)
  .name;
