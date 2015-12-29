import angular from 'angular'

class AuthService {
  constructor($http, $q, SessionService) {
    var vm = this
    vm.baseUrl = ''

    vm.setBaseURL = function(url) {
      vm.baseUrl = url
    }

    vm.login = function(credentials) {
      return $http
        .post(vm.baseUrl + '/api/session/login', credentials)
        .then(function(res) {
          SessionService.create(res.data)
          return res.data
        })
    }

    vm.sessionInfo = function() {
      var deferred = $q.defer()
      $http
        .get(vm.baseUrl + '/api/session/info')
        .success(function(response) {
          SessionService.create(response)
          deferred.resolve()
        })
        .error(function(response) {
          deferred.reject(response.error)
        })
      return deferred.promise
    }

    vm.sitemap = function() {
      var deferred = $q.defer()
      $http.get(vm.baseUrl + '/api/session/sitemap', {
        params: {
          gui: 'ng',
        },
      }).then(function(response) {
        deferred.resolve(response.data)
      })
      return deferred.promise
    }

    vm.logout = function() {
      var deferred = $q.defer()
      $http
        .get(vm.baseUrl + '/api/session/logout')
        .success(function(res) {
          SessionService.destroy()
          deferred.resolve(res)
        })
        .error(function(res) {
          SessionService.destroy()
          deferred.reject(res)
        })
      return deferred.promise
    }
  }
}

AuthService.$inject = ['$http', '$q', 'SessionService']

export default angular.module('app.auth.service', [])
  .service('AuthService', AuthService)
  .name
