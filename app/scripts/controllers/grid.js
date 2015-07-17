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
  this.init.apply(this, arguments);
}

GridCtrl.prototype.init = function($scope, $stateParams, $q, CRUDService, DebugService, AlertService) {
  var vm = this;

  vm.$scope = $scope;
  vm.$stateParams = $stateParams;
  vm.$q = $q;
  vm.CRUDService = CRUDService;
  vm.DebugService = DebugService;
  vm.AlertService = AlertService;

  vm.loader();

  vm.$scope.$on('reloadData', function (event, next) {
    // ToDo: Redraw (re-render) grid. Ex.: when hiding, showing columns
    vm.loader();
  });

  vm.$scope.$on('openDebugModal', function (event, next) {
   vm.DebugService.show({
     catalog: vm.catalog,
     grid: vm.grid,
     model: vm.data
   });
  });
};

GridCtrl.prototype.loader = function() {
  var vm = this;
  vm.CRUDService.read({
    mode: vm.$stateParams.mode,
    catalogName: vm.$stateParams.catalogName,
    controlType: 'gridView',
    getData: "1",
    getStructure: "1"
  }).then(function (res) {
    vm.catalog = res.data.catalog;
    vm.data = res.data.model || [];
    vm.grid = res.data.grid;
  });
};

GridCtrl.prototype.onOpen = function(selected, catalog) {
  var identifier = selected[catalog.primaryKey] ||
           selected[catalog.identityKey];

  this.$scope.$emit('goToState', 'main.panel.form', {
    catalogName: catalog.catalogName,
    mode: catalog.mode,
    id: identifier
  });
};

GridCtrl.prototype.onNew = function (catalogName) {
  this.$scope.$emit('goToState', 'main.panel.form', {
    catalogName: catalogName,
    mode: 'insert',
    id: undefined
  });
};

GridCtrl.prototype.onDelete = function (selected, catalog) {
  var vm = this;
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

   vm.CRUDService.delete(payload).then(function (res) {
     if(res.success === true) {
       if(res.data[0].status === 'error') {
         vm.AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
       } else if(res.data[0].status === 'success') {
         vm.AlertService.show('success', 'Deleted', 'Record(s) successfully deleted');
         // Remove row(s) from Grid // http://stackoverflow.com/questions/26614641/how-to-properly-delete-selected-items-ui-grid-angular-js
         // angular.forEach(selected, function(row, index) {
         //   vm.data.splice(vm.data.lastIndexOf(row), 1);
         // });
         // Emit 'reloadData' instead
         vm.$scope.$emit('reloadData');
       }
     } else {
       // Do nothing. HTTP 500 responses handled by ErrorInterceptor
     }
   });
  }
};

GridCtrl.prototype.onRowChange = function (rowEntity, catalog) {
  // Save Row handler
  // Code based from `form.js`
  var vm = this;
  var promise = vm.$q.defer();

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

  vm.CRUDService.update(payload).then(function (res) {
   if(res.success === true) {
     if(res.data[0].status === 'error') {
       vm.AlertService.show('danger', 'Error', res.data[0].statusMessage + ' [statusId: ' + res.data[0].statusId + ']');
       promise.reject();
     } else if(res.data[0].status === 'success') {
       //vm.AlertService.show('success', 'Saved', 'Record successfully saved');
       promise.resolve();
     }
   } else {
     // HTTP 500 responses handled by ErrorInterceptor
     promise.reject();
   }
  });

  return promise.promise;
};

/**
 * @ngdoc function
 * @name panaxuiApp.controller:FormlyGridCtrl
 * @description
 * # FormlyGridCtrl
 * Controller of the panaxuiApp
 */
angular.module('panaxuiApp')
  .controller('FormlyGridCtrl', FormlyGridCtrl);

function FormlyGridCtrl($scope, $stateParams, $q, CRUDService, DebugService, AlertService) {
  this.init.apply(this, arguments);
}

// Controller inheritance
// http://blog.mgechev.com/2013/12/18/inheritance-services-controllers-in-angularjs/
angular.extend(FormlyGridCtrl.prototype, GridCtrl.prototype);

FormlyGridCtrl.prototype.init = function($scope, $stateParams, $q, CRUDService, DebugService, AlertService) {
  var vm = this;

  vm.$scope = $scope;
  vm.$stateParams = $stateParams;
  vm.$q = $q;
  vm.CRUDService = CRUDService;
  vm.DebugService = DebugService;
  vm.AlertService = AlertService;

  vm.loader();
};

FormlyGridCtrl.prototype.loader = function() {
  var vm = this;
  vm.data = vm.$scope.model[vm.$scope.options.key] || [];
  vm.grid = vm.$scope.options.data.grid;
  vm.catalog = vm.$scope.options.data.catalog;
};
