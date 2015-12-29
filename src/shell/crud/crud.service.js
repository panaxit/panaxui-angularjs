import angular from 'angular'

class CRUDService {
  constructor($http, $q) {
    var vm = this
    vm.$http = $http
    vm.$q = $q
    vm.baseUrl = ''
  }

  // Set base URL if needed (ex. when testing)
  setBaseURL(url) {
    var vm = this
    vm.baseUrl = url
  }

  // GET /api/read
  read(params) {
    var vm = this
    var deferred = vm.$q.defer()
    params.gui = 'ng'
    params.output = params.output || 'json'

    vm.$http
      .get(vm.baseUrl + '/api/read', {
        params: params,
      })
      .then(function(response) {
        deferred.resolve(response)
      })
    return deferred.promise
  }

  // GET /api/options
  options(params) {
    var vm = this
    var deferred = vm.$q.defer()
    params.gui = 'ng'
    params.array = true

    if (params.foreignEntity && params.foreignKey && params.foreignValue) {
      params.filters = '[' + params.foreignKey + "='" + params.foreignValue + "']"
    }

    vm.$http
      .get(vm.baseUrl + '/api/options', {
        params: params,
      })
      .then(function(response) {
        deferred.resolve(response.data)
      })
    return deferred.promise
  }

  // POST /api/create
  create(payload) {
    var vm = this
    var deferred = vm.$q.defer()

    vm.$http
      .post(vm.baseUrl + '/api/create', payload)
      .then(function(response) {
        deferred.resolve(response.data)
      })
    return deferred.promise
  }

  // PUT /api/update
  update(payload) {
    var vm = this
    var deferred = vm.$q.defer()

    vm.$http
      .put(vm.baseUrl + '/api/update', payload)
      .then(function(response) {
        deferred.resolve(response.data)
      })
    return deferred.promise
  }

  // DELETE /api/delete
  delete(payload) {
    var vm = this
    var deferred = vm.$q.defer()

    // http://stackoverflow.com/questions/24829933/angularjs-delete-with-data-sets-wrong-content-type-header
    vm.$http({
      url: vm.baseUrl + '/api/delete',
      method: 'DELETE',
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function(response) {
        deferred.resolve(response.data)
      })
    return deferred.promise
  }

  // POST /api/filters
  filters(payload) {
    var vm = this
    var deferred = vm.$q.defer()

    vm.$http
      .post(vm.baseUrl + '/api/filters', payload)
      .then(function(response) {
        deferred.resolve(response.data)
      })
    return deferred.promise
  }
}

CRUDService.$inject = ['$http', '$q']

export default angular.module('app.crud.service', [])
  .service('CRUDService', CRUDService)
  .name
