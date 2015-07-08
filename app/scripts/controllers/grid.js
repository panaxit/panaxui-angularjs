'use strict';

function GridCtrl($scope) {
  this.init.apply(this, arguments);
}

GridCtrl.$inject = ['$scope', '$stateParams', '$q', 'CRUDService', 'AlertService', 'DebugService'];

angular.module('panaxuiApp').controller('GridCtrl', GridCtrl);

GridCtrl.prototype.init = function($scope, $stateParams, $q, CRUDService, AlertService, DebugService) {
  this._$scope = $scope;
  this._$stateParams = $stateParams;
  this._$q = $q;
  this._CRUDService = CRUDService;
  this._AlertService = AlertService;
  this._DebugService = DebugService;
  var _self = this;

  /*
  Grid options
   */
  _self._$scope.gridOptions = {
    data: [],
    paginationPageSizes: [5, 10, 25, 50, 100, 500],
    paginationPageSize: 25,
    rowHeight: 32,
    enableRowSelection: (_self._$stateParams.mode === 'edit'),
    //multiSelect: (_self._$stateParams.mode === 'edit'),
    //enableSelectAll: (_self._$stateParams.mode === 'edit'),
    //selectionRowHeaderWidth: 32,
    enableCellEdit: (_self._$stateParams.mode === 'edit'),
    enablePaginationControls: false,
    showGridFooter: false
  };

  _self._$scope.gridOptions.onRegisterApi = function(gridApi) {
    _self._$scope.gridApi = gridApi;
    if (_self._$stateParams.mode === 'edit') {
      // Save Row handler
      // Code based from `form.js`
      gridApi.rowEdit.on.saveRow(_self._$scope, function (rowEntity) {
        var promise = $q.defer();
        _self._$scope.gridApi.rowEdit.setSavePromise(rowEntity, promise.promise);

        /**
        * Create payload to be sent
        */
        var payload = {
         tableName: _self._$scope.catalog.catalogName,
         primaryKey: _self._$scope.catalog.primaryKey,
         identityKey: _self._$scope.catalog.identityKey
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

 /*
  Data Loading
   */
  _self._$scope.$on('reloadData', function (event, next) {
    // ToDo: Redraw (re-render) grid. Ex.: when hiding, showing columns
    _self.loadData();
  });

  _self.loadData();

  /*
  Debug Modal
   */
  _self._$scope.$on('openDebugModal', function (event, next) {
   DebugService.show({
     currentUser: _self._$scope.currentUser,
     stateParams: _self._$stateParams,
     catalog: _self._$scope.catalog,
     grid: _self._$scope.gridOptions.columnDefs,
     model: _self._$scope.gridOptions.data
   });
  });

};

// Load Data
GridCtrl.prototype.loadData = function() {
  var _self = this;

  _self._CRUDService.read({
    mode: _self._$stateParams.mode,
    catalogName: _self._$stateParams.catalogName,
    controlType: 'gridView',
    getData: "1",
    getStructure: "1"
  }).then(function (res) {
    // Catalog
    _self._$scope.catalog = res.data.catalog;
    // Grid's Model
    _self._$scope.gridOptions.data = res.data.model || [];
    // Grid's Column Definition (layout)
    _self._$scope.gridOptions.columnDefs = res.data.grid;
    _self._$scope.gridOptions.columnDefs.push({
      name: ' ',
      cellTemplate: 'views/grid.actions.html',
      width: '34',
      enableCellEdit: false,
      enableColumnMenus: false,
      enableFiltering: false,
      enableHiding: false,
      enableSorting: false,
    });
  });
};

//

// View/Edit handler
GridCtrl.prototype.onOpen = function(selected) {
  var identifier = selected[this._$scope.catalog.primaryKey] ||
           selected[this._$scope.catalog.identityKey];

  this._$scope.$emit('goToState', 'main.panel.form.view', {
    catalogName: this._$scope.catalog.catalogName,
    mode: this._$scope.catalog.mode,
    id: identifier
  });
};

// New handler
GridCtrl.prototype.onNew = function(selected) {
      this._$scope.$emit('goToState', 'main.panel.form.view', {
        catalogName: this._$scope.catalog.catalogName,
        mode: 'insert',
        id: undefined
      });
};

// Delete handler
// Code based from `form.js`
GridCtrl.prototype.onDelete = function() {
 var selected = this._$scope.gridApi.selection.getSelectedRows();
 var _self = this;

 if(confirm("Are your sure to Delete selected record(s)?")) {
   /**
    * Create payload to be sent
    */
   var payload = {
     tableName: this._$scope.catalog.catalogName,
     primaryKey: this._$scope.catalog.primaryKey,
     identityKey: this._$scope.catalog.identityKey
   };

   // Set DeleteRows
   payload.deleteRows = [];

   // Set primaryKey and/or identityKey as DeleteRows
   angular.forEach(selected, function(row, index) {
     var identifier = row[_self._$scope.catalog.primaryKey] ||
                      row[_self._$scope.catalog.identityKey];

     payload.deleteRows[index] = {};
     if(payload.primaryKey)
       payload.deleteRows[index][payload.primaryKey] = identifier;
     if(payload.identityKey)
       payload.deleteRows[index][payload.identityKey] = identifier;
   });

   this._CRUDService.delete(payload).then(function (res) {
     if(res.success === true) {
       if(res.data[0].status === 'error') {
         _self._AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
       } else if(res.data[0].status === 'success') {
         _self._AlertService.show('success', 'Deleted', 'Record(s) successfully deleted');
         // Remove row(s) from Grid // http://stackoverflow.com/questions/26614641/how-to-properly-delete-selected-items-ui-grid-angular-js
         angular.forEach(selected, function(row, index) {
           _self._$scope.gridOptions.data.splice(_self._$scope.gridOptions.data.lastIndexOf(row), 1);
         });
       }
     } else {
       // Do nothing. HTTP 500 responses handled by ErrorInterceptor
     }
   });
 }
};

// Get Array
GridCtrl.prototype.getArray = function(num) {
 return new Array(num);
};

function FormlyGridCtrl($scope) {
  this.init.apply(this, arguments);
}

FormlyGridCtrl.$inject = ['$scope', '$stateParams', '$q', 'CRUDService', 'AlertService', 'DebugService'];

angular.module('panaxuiApp').controller('FormlyGridCtrl', FormlyGridCtrl);

angular.extend(FormlyGridCtrl.prototype, GridCtrl.prototype);

FormlyGridCtrl.prototype.loadData = function(){
  // // Catalog
  // vm.catalog = res.data.catalog;
  // Grid's Model
  this._$scope.gridOptions.data = this._$scope.model[this._$scope.options.key] || [];
  // Grid's Column Definition (layout)
  this._$scope.gridOptions.columnDefs = this._$scope.to.grid;
  this._$scope.gridOptions.columnDefs.push({
    name: ' ',
    cellTemplate: 'views/grid.actions.html',
    width: '34',
    enableCellEdit: false,
    enableColumnMenus: false,
    enableFiltering: false,
    enableHiding: false,
    enableSorting: false,
  });
}
