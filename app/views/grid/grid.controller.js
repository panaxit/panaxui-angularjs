export default class GridCtrl {
  constructor($scope, $stateParams, $q, CRUDService, DebugService, AlertService) {
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

    vm.$scope.$on('openDebugModal', (event, next) => { vm.openDebugModal(); });
  }

  openDebugModal() {
    var vm = this;
    vm.DebugService.show({
      catalog: vm.catalog,
      grid: vm.grid,
      model: vm.data
    });
  }

  loader(pageIndex, pageSize) {
    var vm = this;
    var params = {
      mode: vm.$stateParams.mode,
      catalogName: vm.$stateParams.catalogName,
      controlType: 'gridView',
      getData: "1",
      getStructure: "1",
      pageIndex: pageIndex || '1',
      pageSize: pageSize || '25'
    };
    vm.CRUDService.read(params).then(function (res) {
      vm.catalog = res.data.catalog;
      vm.data = res.data.model || [];
      vm.grid = res.data.grid;
    });
  }

  onOpen(selected, catalog) {
    var identifier = selected[catalog.primaryKey] ||
             selected[catalog.identityKey];

    this.$scope.$emit('goToState', 'main.panel.form', {
      catalogName: catalog.catalogName,
      mode: catalog.mode,
      id: identifier
    });
  }

  onNew(catalogName) {
    this.$scope.$emit('goToState', 'main.panel.form', {
      catalogName: catalogName,
      mode: 'insert',
      id: undefined
    });
  }

  onDelete(selected, catalog) {
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
  }

  onPaginationChange(newPage, pageSize) {
    var vm = this;
    vm.loader(newPage+'', pageSize+'');
  }

  onRowChange(rowEntity, catalog) {
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
  }
}

GridCtrl.$inject = ['$scope', '$stateParams', '$q', 'CRUDService', 'DebugService', 'AlertService'];
