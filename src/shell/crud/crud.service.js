import angular from 'angular';

class CRUDService {
  constructor($http, $q) {
    var vm = this;

    /*
    Set base URL if needed (ex. when testing)
     */
    vm.base_url = '';

    vm.setBaseURL = function(url) {
      vm.base_url = url;
    };

    /**
     * GET /api/read
     */
    vm.read = function(params) {
      var deferred = $q.defer();
      params.gui = 'ng';
      params.output = 'json';

      $http
        .get(vm.base_url + "/api/read", {params: params})
        .then(function (response) {
          deferred.resolve(response.data);
        });
      return deferred.promise;
    };

    /**
     * GET /api/options
     */
    vm.options = function(params) {
      var deferred = $q.defer();
      params.gui = 'ng';
      params.array = true;

      if(params.foreignEntity && params.foreignKey && params.foreignValue)
        params.filters = "["+params.foreignKey+"='"+params.foreignValue+"']";

      $http
        .get(vm.base_url + "/api/options", {params: params})
        .then(function (response) {
          deferred.resolve(response.data);
        });
      return deferred.promise;
    };

    /**
     * POST /api/create
     */
    vm.create = function(payload) {
      var deferred = $q.defer();

      $http
        .post(vm.base_url + "/api/create", payload)
        .then(function (response) {
          deferred.resolve(response.data);
        });
      return deferred.promise;
    };

    /**
     * PUT /api/update
     */
    vm.update = function(payload) {
      var deferred = $q.defer();

      $http
        .put(vm.base_url + "/api/update", payload)
        .then(function (response) {
          deferred.resolve(response.data);
        });
      return deferred.promise;
    };

    /**
     * DELETE /api/delete
     */
    vm.delete = function(payload) {
      var deferred = $q.defer();

      // http://stackoverflow.com/questions/24829933/angularjs-delete-with-data-sets-wrong-content-type-header
      $http({
        url: vm.base_url + "/api/delete",
        method: 'DELETE',
        data: payload,
        headers: {'Content-Type': 'application/json'}
      })
        .then(function (response) {
          deferred.resolve(response.data);
        });
      return deferred.promise;
    };

    /**
     * POST /api/filters
     */
    vm.filters = function(payload) {
      var deferred = $q.defer();

      $http
        .post(vm.base_url + "/api/filters", payload)
        .then(function (response) {
          deferred.resolve(response.data);
        });
      return deferred.promise;
    };

  }
}

CRUDService.$inject = ['$http', '$q'];

export default angular.module('app.crud.service', [])
  .service('CRUDService', CRUDService)
  .name;
