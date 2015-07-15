'use strict';

/**
 * @ngdoc directive
 * @name panaxuiApp.directive:pxGrid
 * @description
 * # pxGrid
 */
angular.module('panaxuiApp')
  .directive('pxGrid', pxGrid);

function pxGrid() {
  return {
    restrict: 'E',
    templateUrl: 'scripts/directives/px-grid/pxgrid.html',
    scope: {
      catalog: '=',
      data: '=',
      grid: '=',
      loader: '&',
      openHandler: '&',
      newHandler: '&',
      deleteHandler: '&'
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function ($scope, $stateParams, $q, DebugService, CRUDService, AlertService) {
      var vm = this;

      vm.gridOptions = {
        paginationPageSizes: [5, 10, 25, 50, 100, 500],
        paginationPageSize: 25,
        rowHeight: 32,
        enableRowSelection: (vm.catalog.mode === 'edit'),
        //multiSelect: (vm._$stateParams.mode === 'edit'),
        //enableSelectAll: (vm._$stateParams.mode === 'edit'),
        //selectionRowHeaderWidth: 32,
        enableCellEdit: (vm.catalog.mode === 'edit'),
        enablePaginationControls: false,
        showGridFooter: false,
        onRegisterApi: function(gridApi) {
          vm.gridApi = gridApi;
          if (vm.catalog.mode === 'edit') {
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
        }
      };

      $scope.$watch('vm.data', function(newData) {
        vm.gridOptions.data = newData;
      });

      $scope.$watch('vm.grid', function(newGrid) {
        vm.gridOptions.columnDefs = newGrid;
        vm.gridOptions.columnDefs.push({
          name: 'px-actions',
          displayName: '⚡',
          type: 'object',
          cellTemplate: 'scripts/directives/px-grid/pxgrid.row.actions.html',
          width: '34',
          enableCellEdit: false,
          enableColumnMenus: false,
          enableFiltering: false,
          enableHiding: false,
          enableSorting: false,
        });
      });

      vm.getArray = function(num) {
        return new Array(num);
      };
    }
  }
}
