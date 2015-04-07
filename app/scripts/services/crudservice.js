'use strict';

/**
 * @ngdoc service
 * @name panaxuiApp.CRUDService
 * @description
 * # CRUDService
 * Factory in the panaxuiApp.
 */
angular.module('panaxuiApp')
  .factory('CRUDService', function ($http, $q) {
  	var CRUDService = {};

    /**
     * GET /api/read
     */
  	CRUDService.read = function(params) {
	    var deferred = $q.defer();
	    params.gui = 'ng';
	    params.output = 'json';

	    $http
		    .get("/api/read", {params: params})
		    .then(function (response) {
		      deferred.resolve(response.data);
		    });
	    return deferred.promise;
		};

    /**
     * POST /api/create
     */
  	CRUDService.create = function(payload) {
	    var deferred = $q.defer();

	    $http
	    	.post("/api/create", payload)
		    .then(function (response) {
		      deferred.resolve(response.data);
		    });
	    return deferred.promise;
		};

    /**
     * PUT /api/update
     */
  	CRUDService.update = function(payload) {
	    var deferred = $q.defer();

	    $http
	    	.put("/api/update", payload)
		    .then(function (response) {
		      deferred.resolve(response.data);
		    });
	    return deferred.promise;
		};

    /**
     * DELETE /api/delete
     */
  	CRUDService.delete = function(payload) {

		};

    return CRUDService;
  });
