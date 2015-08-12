export default class GridCtrl {
  constructor($scope, $stateParams, $q, CRUDService, DebugService, AlertService) {
    var vm = this;

    vm.$scope = $scope;
    vm.$stateParams = $stateParams;
    vm.$q = $q;
    vm.CRUDService = CRUDService;
    vm.DebugService = DebugService;
    vm.AlertService = AlertService;

    // Initially set defaults, load & configure
    vm.defaults();
    vm.load().then(() => { vm.configure(); });

    vm.$scope.$on('reloadData', function (event, next) {
      // ToDo: Redraw (re-render) grid. Ex.: when hiding, showing columns
      vm.load();
    });

    vm.$scope.$on('openDebugModal', (event, next) => { vm.openDebugModal(); });
  }

  defaults() {
    var vm = this;
    // Default options
    vm.options = {
      // Pagination options
      paginationPageSizes: [5, 10, 25, 50, 100, 500],
      enablePaginationControls: false,
      rowHeight: 32,
      showGridFooter: false,
      //selectionRowHeaderWidth: 32,
      onRegisterApi: function(gridApi) {
        vm.gridApi = gridApi;
        // Row edit
        vm.gridApi.rowEdit.on.saveRow(vm.$scope, function(rowEntity) {
          vm.gridApi.rowEdit.setSavePromise(rowEntity, vm.rowChangePromise({rowEntity: rowEntity}));
        });
        // External pagination
        vm.gridApi.pagination.on.paginationChanged(vm.$scope, function(newPage, pageSize) {
          vm.paginationChangeHandler({newPage: newPage, pageSize: pageSize});
        });
      },
      currentPage: parseInt(vm.$stateParams.pageIndex) || 1,
      paginationPageSize: parseInt(vm.$stateParams.pageSize) || 25
    };
  }

  load(pageIndex, pageSize) {
    var vm = this;
    var deferred = this.$q.defer();
    var params = {
      mode: vm.$stateParams.mode,
      catalogName: vm.$stateParams.catalogName,
      filters: vm.$stateParams.filters || '',
      controlType: 'gridView',
      getData: "1",
      getStructure: "1",
      pageIndex: pageIndex || vm.options.currentPage,
      pageSize: pageSize || vm.options.paginationPageSize
    };
    vm.CRUDService.read(params).then(function (res) {
      vm.catalog = res.data.catalog;
      vm.data = res.data.model || [];
      vm.grid = res.data.grid;
      vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label);
      deferred.resolve(res.data);
    });
    return deferred.promise;
  }

  configure() {
    debugger;
    var vm = this;
    vm.options.data = vm.data;
    vm.options.columnDefs = vm.grid.columnDefs;
    vm.options.columnDefs.push({
      name: 'px-actions',
      displayName: '⚡',
      type: 'object',
      cellTemplate: require('../../directives/px-grid/pxgrid.row.actions.html'),
      width: '34',
      enableCellEdit: false,
      enableColumnMenus: false,
      enableFiltering: false,
      enableHiding: false,
      enableSorting: false,
    });
    if(vm.catalog.totalItems) {
      vm.options.useExternalPagination = true;
      vm.options.totalItems = vm.catalog.totalItems;
      vm.options.paginationPageSize = vm.catalog.pageSize;
      vm.options.paginationCurrentPage = vm.catalog.pageIndex;
    }
    vm.options.enableCellEdit = (vm.catalog.mode === 'edit');
    vm.options.enableRowSelection = (vm.catalog.mode === 'edit');
    //vm.options.multiSelect = (vm.catalog.mode === 'edit');
    //vm.options.enableSelectAll = (vm.catalog.mode === 'edit');
  }

  openDebugModal() {
    var vm = this;
    vm.DebugService.show({
      catalog: vm.catalog,
      grid: vm.grid,
      model: vm.data
    });
  }

  onOpen(selected, catalog) {
    var vm = this;
    var idType = (!!catalog.identityKey) ? 'identityKey' : 'primaryKey';
    var idKey = catalog[idType];
    var idValue = selected[idKey];

    vm.$scope.$emit('goToState', 'main.panel.form', {
      catalogName: catalog.catalogName,
      mode: catalog.mode,
      [idType]: idKey,
      id: idValue
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

  onPaginationChange(newPage, oldPage, newPageSize, oldPageSize) {
    var vm = this;
    if((oldPage!==undefined && newPage!==oldPage) || (oldPageSize!==undefined && newPageSize!==newPageSize)) {
      vm.load(newPage, newPageSize);
      return;
    }
  }

  onRowChange(rowEntity) {
    // Save Row handler
    var vm = this;
    var promise = vm.$q.defer();

    // Do not update if not in edit mode
    if(vm.catalog.mode !== 'edit') {
      promise.reject();
      return promise.promise;
    }

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
