'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:GridCtrl
 * @description
 * # GridCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
  .controller('GridCtrl', GridCtrl);

function GridCtrl($scope, $stateParams, $q, CRUDService, DebugService, AlertService) {
  var vm = this;

  vm.loader = function() {
    CRUDService.read({
      mode: $stateParams.mode,
      catalogName: $stateParams.catalogName,
      controlType: 'gridView',
      getData: "1",
      getStructure: "1"
    }).then(function (res) {
      vm.catalog = res.data.catalog;
      vm.data = res.data.model || [];
      vm.grid = res.data.grid;
    });
  };

  vm.loader();

  vm.watchers = function() {
    $scope.$on('reloadData', function (event, next) {
      // ToDo: Redraw (re-render) grid. Ex.: when hiding, showing columns
      vm.loader();
    });
    $scope.$on('openDebugModal', function (event, next) {
     DebugService.show({
       catalog: vm.catalog,
       grid: vm.grid,
       model: vm.data
     });
    });
  };

  vm.watchers();

  vm.onOpen = function(selected, catalog) {
    var identifier = selected[catalog.primaryKey] ||
             selected[catalog.identityKey];

    $scope.$emit('goToState', 'main.panel.form', {
      catalogName: catalog.catalogName,
      mode: catalog.mode,
      id: identifier
    });
  };

  vm.onNew = function (catalogName) {
    $scope.$emit('goToState', 'main.panel.form', {
      catalogName: catalogName,
      mode: 'insert',
      id: undefined
    });
  };

  vm.onDelete = function (selected, catalog) {
    if(confirm("Are your sure to Delete selected record(s)?")) {
     /**
      * Create payload to be sent
      */
     var payload = {
       tableName: catalog.catalogName,
       primaryKey: catalog.primaryKey,
       identityKey: catalog.identityKey
     };

     // Set DeleteRows
     payload.deleteRows = [];

     // Set primaryKey and/or identityKey as DeleteRows
     angular.forEach(selected, function(row, index) {
       var identifier = row[catalog.primaryKey] ||
                        row[catalog.identityKey];

       payload.deleteRows[index] = {};
       if(payload.primaryKey)
         payload.deleteRows[index][payload.primaryKey] = identifier;
       if(payload.identityKey)
         payload.deleteRows[index][payload.identityKey] = identifier;
     });

     CRUDService.delete(payload).then(function (res) {
       if(res.success === true) {
         if(res.data[0].status === 'error') {
           AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
         } else if(res.data[0].status === 'success') {
           AlertService.show('success', 'Deleted', 'Record(s) successfully deleted');
           // Remove row(s) from Grid // http://stackoverflow.com/questions/26614641/how-to-properly-delete-selected-items-ui-grid-angular-js
           // angular.forEach(selected, function(row, index) {
           //   vm.data.splice(vm.data.lastIndexOf(row), 1);
           // });
           // Emit 'reloadData' instead
           $scope.$emit('reloadData');
         }
       } else {
         // Do nothing. HTTP 500 responses handled by ErrorInterceptor
       }
     });
    }
  };

  vm.onRowChange = function (rowEntity, catalog) {
    // Save Row handler
    // Code based from `form.js`
    var promise = $q.defer();

    /**
    * Create payload to be sent
    */
    var payload = {
     tableName: catalog.catalogName,
     primaryKey: catalog.primaryKey,
     identityKey: catalog.identityKey
    };

    // Set DataRows
    payload.updateRows = [rowEntity];

    CRUDService.update(payload).then(function (res) {
     if(res.success === true) {
       if(res.data[0].status === 'error') {
         AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
         promise.reject();
       } else if(res.data[0].status === 'success') {
         //AlertService.show('success', 'Saved', 'Record successfully saved');
         promise.resolve();
       }
     } else {
       // HTTP 500 responses handled by ErrorInterceptor
       promise.reject();
     }
    });

    return promise.promise;
  }

}
