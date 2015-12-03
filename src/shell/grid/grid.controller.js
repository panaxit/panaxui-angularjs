import BaseCtrl from '../base/base.controller';

export default class GridCtrl extends BaseCtrl {
  constructor($scope, DebugService, $stateParams, CRUDService, AlertService, $q) {
    super($scope, DebugService, $stateParams, CRUDService, AlertService, $q);
  }

  loader(pageIndex, pageSize) {
    var vm = this;
    var params = {
      catalogName: vm.$stateParams.catalogName,
      controlType: 'gridView',
      mode: vm.$stateParams.mode,
      filters: vm.$stateParams.filters || '',
      getData: "1",
      getStructure: "1",
      pageIndex: pageIndex || parseInt(vm.$stateParams.pageIndex) || 1,
      pageSize: pageSize || parseInt(vm.$stateParams.pageSize) || 25
    };
    vm.CRUDService.read(params).then(function (res) {
      vm.metadata = res.data.data.metadata;
      vm.data = res.data.data.model || [];
      vm.fields = res.data.data.fields;

      vm.setOptions();
      vm.$scope.$emit('setPanelTitle', vm.$scope.currentNavBranch.label);
    });
  }

  setOptions() {
    var vm = this;
    vm.options = {
      showAddRemoveRow: vm.metadata.mode === 'edit',
      showNextRow: vm.metadata.mode === 'browse',
      showPaginationRow: true,
      showRowActionsColumn: (['edit', 'readonly'].indexOf(vm.metadata.mode) > -1),
      enableRowSelection: (['edit', 'browse'].indexOf(vm.metadata.mode) > -1),
      enableRowHeaderSelection: (['edit', 'browse'].indexOf(vm.metadata.mode) > -1),
      enableFullRowSelection: vm.metadata.mode === 'browse',
      multiSelect: (['edit', 'browse'].indexOf(vm.metadata.mode) > -1),
      enableCellEdit: vm.metadata.mode === 'edit'
    };
  }

  onOpen(selected) {
    var vm = this;
    var idType = (!!vm.metadata.identityKey) ? 'identityKey' : 'primaryKey';
    var idKey = vm.metadata[idType];
    var idValue = selected[idKey];

    vm.$scope.$emit('goToState', 'main.panel.form', {
      catalogName: vm.metadata.catalogName,
      mode: vm.metadata.mode,
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

  onDelete(selected) {
    var vm = this;
    if(confirm("Are your sure to Delete selected record(s)?")) {
     /**
      * Create payload to be sent
      */
     var payload = {
       tableName: vm.metadata.catalogName,
       primaryKey: vm.metadata.primaryKey,
       identityKey: vm.metadata.identityKey
     };

     // Set DeleteRows
     payload.deleteRows = [];

     // Set primaryKey and/or identityKey as DeleteRows
     angular.forEach(selected, function(row, index) {
       var identifier = row[vm.metadata.primaryKey] ||
                        row[vm.metadata.identityKey];

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
    vm.loader(newPage, pageSize);
  }

  onRowChange(rowEntity) {
    // Save Row handler
    var vm = this;
    var promise = vm.$q.defer();

    // Do not update if not in edit mode
    if(vm.metadata.mode !== 'edit') {
      promise.reject();
      return promise.promise;
    }

    /**
    * Create payload to be sent
    */
    var payload = {
     tableName: vm.metadata.catalogName,
     primaryKey: vm.metadata.primaryKey,
     identityKey: vm.metadata.identityKey
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

  onNext(selected) {
    var vm = this;
    var len = selected.length,
        idKey = vm.metadata.identityKey || vm.metadata.primaryKey,
        filters = '[' + idKey + ' IN (';
    angular.forEach(selected, function(row, index) {
      filters += `'${row[idKey]}'`;
      if(index !== len-1) {
        filters += ', ';
      }
    });
    filters += ')]';
    // ToDo: PanaxDB Routes
    vm.$scope.$emit('goToState', 'main.panel.form', {
      catalogName: vm.metadata.catalogName,
      mode: 'edit',
      filters: filters
    });
  }
}
