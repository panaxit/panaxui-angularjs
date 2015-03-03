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

  	CRUDService.read = function(args) {
	    var deferred = $q.defer();
	    $http
		    .get("/api/read", {
		    	params: {
		    		gui: 'ng',
		    		output: 'json',
		    		catalogName: args.catalogName,
		    		controlType: args.controlType,
		    		getData: args.getData,
		    		getStructure: args.getStructure
		    	}
		    })
		    .then(function (response) {
		      deferred.resolve(response.data);
		    });
	    return deferred.promise;
		};

    return CRUDService;
  });
