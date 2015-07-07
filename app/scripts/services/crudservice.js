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
     * GET /api/options
     */
    CRUDService.options = function(params) {
      var deferred = $q.defer();
      params.gui = 'ng';
      params.array = true;

      if(params.foreignEntity)
        params.filters = "["+params.foreignKey+"='"+params.foreignValue+"']";

      $http
        .get("/api/options", {params: params})
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
	    var deferred = $q.defer();

	    // http://stackoverflow.com/questions/24829933/angularjs-delete-with-data-sets-wrong-content-type-header
      $http({
      	url: "/api/delete",
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
     * Create data table payload to be sent
     */
    CRUDService.buildPersistPayload = function(form, model, catalog, id) {

      var dirtyFieldsIterator = function(obj, dirty_model, orig_model, orig_catalog) {
        angular.forEach(obj, function (el) {
          // fieldset / tab
          if(el.fields) {
            dirtyFieldsIterator(el.fields, dirty_model, orig_model, orig_catalog);
          }
          // tabs
          if(el.tabs) {
            dirtyFieldsIterator(el.tabs, dirty_model, orig_model, orig_catalog);
          }
          // fieldGroup
          if(el.fieldGroup) {
            // Nested model
            if(el.key){
              dirty_model[el.key] = {
                tableName: orig_catalog[el.key].catalog.catalogName,
                primaryKey: orig_catalog[el.key].catalog.primaryKey,
                identityKey: orig_catalog[el.key].catalog.identityKey,
                foreignReference: orig_catalog[el.key].catalog.foreignReference
              };
              if(orig_catalog[el.key].catalog.mode === 'insert') {
                dirty_model[el.key].insertRows = [{}];
                dirtyFieldsIterator(el.fieldGroup, dirty_model[el.key].insertRows[0],
                                    orig_model[el.key], orig_catalog[el.key].catalog);
              } else if(orig_catalog[el.key].catalog.mode === 'edit') {
                dirty_model[el.key].updateRows = [{}];
                dirtyFieldsIterator(el.fieldGroup, dirty_model[el.key].updateRows[0],
                                    orig_model[el.key], orig_catalog[el.key].catalog);
              }
            } else {
              dirtyFieldsIterator(el.fieldGroup, dirty_model, orig_model, orig_catalog);
            }
          }
          // Copy regular field's value
          if(el.formControl && el.formControl.$dirty && orig_model.hasOwnProperty(el.key)) {
            dirty_model[el.key] = el.formControl.$modelValue || el.formControl.$viewValue;
          }
        });
      };

      var payload = {
        tableName: catalog.catalogName,
        primaryKey: catalog.primaryKey,
        identityKey: catalog.identityKey
      };

      if(catalog.mode === 'insert') {
        payload.insertRows = [{}];
        dirtyFieldsIterator(form, payload.insertRows[0], model, catalog);
      } else if(catalog.mode === 'edit') {
        payload.updateRows = [{}];
        dirtyFieldsIterator(form, payload.updateRows[0], model, catalog);
        // Set primaryKey and/or identityKey as DataRow with current value
        if(!!payload.primaryKey)
          payload.updateRows[0][payload.primaryKey] = id;
        if(!!payload.identityKey)
          payload.updateRows[0][payload.identityKey] = id;
      }

      return payload;
    };

    return CRUDService;
  });
