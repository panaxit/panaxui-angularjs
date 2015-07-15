'use strict';

/**
 * @ngdoc function
 * @name panaxuiApp.controller:GridCtrl
 * @description
 * # GridCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
  .controller('GridCtrl', function($scope, $stateParams, CRUDService, DebugService, AlertService) {
    var vm = this;

    vm.grid = [];
    vm.catalog = {};
    vm.data = [];

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

    $scope.$on('reloadData', function (event, next) {
      // ToDo: Redraw (re-render) grid. Ex.: when hiding, showing columns
      vm.loader();
    });

    vm.onOpen = function(selected) {
      var identifier = selected[vm.catalog.primaryKey] ||
               selected[vm.catalog.identityKey];

      $scope.$emit('goToState', 'main.panel.form.view', {
        catalogName: vm.catalog.catalogName,
        mode: vm.catalog.mode,
        id: identifier
      });
    };

    vm.onNew = function () {
      $scope.$emit('goToState', 'main.panel.form.view', {
        catalogName: vm.catalog.catalogName,
        mode: 'insert',
        id: undefined
      });
    };

    vm.onDelete = function (selected) {
      if(confirm("Are your sure to Delete selected record(s)?")) {
       /**
        * Create payload to be sent
        */
       var payload = {
         tableName: vm.catalog.catalogName,
         primaryKey: vm.catalog.primaryKey,
         identityKey: vm.catalog.identityKey
       };

       // Set DeleteRows
       payload.deleteRows = [];

       // Set primaryKey and/or identityKey as DeleteRows
       angular.forEach(selected, function(row, index) {
         var identifier = row[vm.catalog.primaryKey] ||
                          row[vm.catalog.identityKey];

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
             angular.forEach(selected, function(row, index) {
               vm.data.splice(vm.data.lastIndexOf(row), 1);
             });
           }
         } else {
           // Do nothing. HTTP 500 responses handled by ErrorInterceptor
         }
       });
      }
    };

    $scope.$on('openDebugModal', function (event, next) {
     DebugService.show({
       catalog: vm.catalog,
       grid: vm.grid,
       model: vm.data
     });
    });

  });
