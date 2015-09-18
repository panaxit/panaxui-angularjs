import angular from 'angular';

class CRUDService {
  constructor($http, $q) {
  	var vm = this;

    /**
     * GET /api/read
     */
  	vm.read = function(params) {
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
    vm.options = function(params) {
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
  	vm.create = function(payload) {
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
  	vm.update = function(payload) {
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
    vm.delete = function(payload) {
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
     * POST /api/filters
     */
    vm.filters = function(payload) {
      var deferred = $q.defer();

      $http
        .post("/api/filters", payload)
        .then(function (response) {
          deferred.resolve(response.data);
        });
      return deferred.promise;
    };

    /**
     * Create data table payload to be sent
     * Used by: Form
     */
    vm.buildPersistPayload = function(fields, model, catalog) {

      var dirtyFieldsIterator = function(fields, dirty_model, orig_model) {
        angular.forEach(fields, function (el) {
          // fieldset / tab
          if(el.fields) {
            dirtyFieldsIterator(el.fields, dirty_model, orig_model);
            return;
          }
          // tabs
          if(el.tabs) {
            dirtyFieldsIterator(el.tabs, dirty_model, orig_model);
            return;
          }
          // Nested Form
          if(el.data && el.data.fields) {
            dirty_model[el.key] = {
              tableName: el.data.catalog.catalogName,
              primaryKey: el.data.catalog.primaryKey,
              identityKey: el.data.catalog.identityKey,
              foreignReference: el.data.catalog.foreignReference
            };
            var rowsType;
            if(el.data.catalog.mode === 'insert') rowsType = 'insertRows';
            if(el.data.catalog.mode === 'edit') rowsType = 'updateRows';
            if(el.data.catalog.mode === 'filters') rowsType = 'dataRows';
            if(angular.isObject(orig_model[el.key])) {
              dirty_model[el.key][rowsType] = [{}];
              dirtyFieldsIterator(el.data.fields[0], dirty_model[el.key][rowsType][0], orig_model[el.key]);
              return;
            } else if (isArray(orig_model[el.key])) {
              dirty_model[el.key][rowsType] = [];
              orig_model[el.key].forEach((record, index) => {
                var row = {};
                dirtyFieldsIterator(el.data.fields[index], row, record);
                dirty_model[el.key][rowsType].push(row);
                return;
              });
            }
          }
          // fieldGroup (async_select, ...)
          if(el.fieldGroup) {
            dirtyFieldsIterator(el.fieldGroup, dirty_model, orig_model);
            return;
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
        payload.insertRows = [];
        model.forEach((record, index) => {
          var row = {};
          dirtyFieldsIterator(fields[index], row, record);
          payload.insertRows.push(row);
        });
      } else if(catalog.mode === 'edit') {
        payload.updateRows = [];
        model.forEach((record, index) => {
          var row = {};
          dirtyFieldsIterator(fields[index], row, record);
          // Set primaryKey and/or identityKey as DataRow with current value
          if(!!payload.primaryKey) {
            row[payload.primaryKey] = record[payload.primaryKey];
          }
          if(!!payload.identityKey) {
            row[payload.identityKey] = record[payload.identityKey];
          }
          payload.updateRows.push(row);
        });
      } else if(catalog.mode === 'filters') {
        payload.dataRows = [];
        model.forEach((record, index) => {
          var row = {};
          dirtyFieldsIterator(fields[index], row, record);
          payload.dataRows.push(row);
        });
      }

      return payload;
    };

  }
}

export default angular.module('app.crud.service', [])
  .service('CRUDService', CRUDService)
  .name;
