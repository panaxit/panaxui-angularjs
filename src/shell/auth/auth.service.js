import angular from 'angular';

class AuthService {
  constructor($http, $q, SessionService) {
  	var vm = this;

	  vm.login = function(credentials) {
			return $http
				.post('/api/session/login', credentials)
				.then(function (res) {
					SessionService.create(res.data);
					return res.data;
				});
	  };

		vm.isAuthenticated = function() {
			return !!SessionService.userId;
		};

		vm.sessionInfo = function() {
	    var deferred = $q.defer();
			$http
				.get('/api/session/info')
				.success(function (response) {
					SessionService.create(response);
					deferred.resolve();
				})
        .error(function (response) {
          deferred.reject(response.error);
        });
			return deferred.promise;
		};

		vm.sitemap = function() {
	    var deferred = $q.defer();
	    $http
		    .get("/api/session/sitemap", {
		    	params: {
		    		gui: 'ng'
		    	}
		    })
		    .then(function (response) {
		      deferred.resolve(response.data);
		    });
	    return deferred.promise;
		};

		vm.logout = function() {
      var deferred = $q.defer();
			$http
				.get('/api/session/logout')
				.success(function (res) {
					SessionService.destroy();
          deferred.resolve(res);
				})
        .error(function() {
          SessionService.destroy();
          deferred.reject(res);
        });
      return deferred.promise;
		};
  }
}

export default angular.module('app.auth.service', [])
  .service('AuthService', AuthService)
  .name;