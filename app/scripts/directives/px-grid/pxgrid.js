'use strict';

/**
 * @ngdoc directive
 * @name panaxuiApp.directive:pxGrid
 * @description
 * # pxGrid
 */
angular.module('panaxuiApp')
  .directive('pxGrid', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/directives/px-grid/pxgrid.html',
      scope: {
        //gridOptions: '='
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: function ($scope, $stateParams, $q, DebugService, CRUDService, AlertService) {
        var vm = this;
        vm.catalog = {};
        vm.gridOptions = {
          data: [],
          paginationPageSizes: [5, 10, 25, 50, 100, 500],
          paginationPageSize: 25,
          rowHeight: 32,
          enableRowSelection: ($stateParams.mode === 'edit'),
          //multiSelect: (vm._$stateParams.mode === 'edit'),
          //enableSelectAll: (vm._$stateParams.mode === 'edit'),
          //selectionRowHeaderWidth: 32,
          enableCellEdit: ($stateParams.mode === 'edit'),
          enablePaginationControls: false,
          showGridFooter: false
        };
        vm.gridOptions.onRegisterApi = function(gridApi) {
          vm.gridApi = gridApi;
          if ($stateParams.mode === 'edit') {
            // Save Row handler
            // Code based from `form.js`
            gridApi.rowEdit.on.saveRow($scope, function (rowEntity) {
              var promise = $q.defer();
              vm.gridApi.rowEdit.setSavePromise(rowEntity, promise.promise);

              /**
              * Create payload to be sent
              */
              var payload = {
               tableName: vm.catalog.catalogName,
               primaryKey: vm.catalog.primaryKey,
               identityKey: vm.catalog.identityKey
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
            });
          }
        };
        vm.loader = function() {
          CRUDService.read({
            mode: $stateParams.mode,
            catalogName: $stateParams.catalogName,
            controlType: 'gridView',
            getData: "1",
            getStructure: "1"
          }).then(function (res) {
            // Catalog
            vm.catalog = res.data.catalog;
            // Grid's Model
            vm.gridOptions.data = res.data.model || [];
            // Grid's Column Definition (layout)
            vm.gridOptions.columnDefs = res.data.grid;
            vm.gridOptions.columnDefs.push({
              name: ' ',
              cellTemplate: 'scripts/directives/px-grid/pxgrid.row.actions.html',
              width: '34',
              enableCellEdit: false,
              enableColumnMenus: false,
              enableFiltering: false,
              enableHiding: false,
              enableSorting: false,
            });
          });
        };
        vm.loader();
        $scope.$on('reloadData', function (event, next) {
          // ToDo: Redraw (re-render) grid. Ex.: when hiding, showing columns
          vm.loader();
        });
        $scope.$on('openDebugModal', function (event, next) {
         DebugService.show({
           catalog: vm.catalog,
           grid: vm.gridOptions.columnDefs,
           model: vm.gridOptions.data
         });
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
        vm.onDelete = function () {
          var selected = vm.gridApi.selection.getSelectedRows();

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
                   vm.gridOptions.data.splice(vm.gridOptions.data.lastIndexOf(row), 1);
                 });
               }
             } else {
               // Do nothing. HTTP 500 responses handled by ErrorInterceptor
             }
           });
          }
        };
        vm.getArray = function(num) {
          return new Array(num);
        };
      }
    }
  });
